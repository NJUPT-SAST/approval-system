import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Button, notification, Space, Statistic, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import './index.scss'
import { getScoreWorkList, getJudgeWorkList } from '../../api/judge'
import { getCompetitionInfo } from '../../api/user'

// 限制表格数据类型
interface DataType {
  id: number
  name: string
  score: number
  judge: string
}

// 渲染主界面
function ReviewList() {
  const { comId, page } = useParams()
  const navigate = useNavigate()
  // 当前页
  const [pageNum, setPageNum] = useState(1)
  // 页面数据
  const [dataList, setDataList] = useState<any>({})
  const [programList, setProgramList] = useState<any>([])
  const [isEnd, setIsEnd] = useState(false)
  const [isApproveCount, setIsApproveCount] = useState(0)
  const userState = localStorage.getItem('userState')

  const [loading, setLoading] = useState(true)
  // 获取子组件中的页数
  const getpageNum = (current: number) => {
    setPageNum(current)
    navigate(`/review/list/${comId}/${current}`)
  }

  function resDataProcessing(res: any, role: string) {
    const result = res.data.data
    if (result === null) {
      setTimeout(() => {
        notification.info({
          message: '该页面没有数据,返回上一页',
          top: 20,
          placement: 'top',
        })
      }, 100)
      navigate('/review')
    }
    // console.log(res.data.data);

    const programList = res.data.data.list

    if (role === 'approver') {
      let scoreCount = 0
      let isScore;
      for (let i = 0; i < programList.length; i++) {
        programList[i]?.score ? isScore = true : isScore = false
        // const isApprove = programList[i]?.score !== null || programList[i]?.score !== undefined
        // console.log(isApprove);

        programList[i].isApprove = isScore
        if (isScore) {
          scoreCount++
        }
      }

      setIsApproveCount(scoreCount)
    } else {
      let judgeCount = 0
      for (let i = 0; i < programList.length; i++) {
        console.log(programList[i]);
        if (programList[i]?.isPass === true) {
          judgeCount++;
          result.list[i].isJudge = true
          result.list[i].isPass = '通过'
        } else if (programList[i]?.isPass === false) {
          judgeCount++;
          result.list[i].isJudge = true
          result.list[i].isPass = '未通过'
        } else {
          result.list[i].isJudge = false
          result.list[i].isPass = ''
        }
      }
      setIsApproveCount(judgeCount)
    }
    setProgramList(programList)
    setDataList(result)
    localStorage.setItem('listTotal', res.data.data.total)
    setLoading(false)
  }

  // 获取表格数据
  useEffect(() => {
    setLoading(true)
    getCompetitionInfo(Number(comId)).then((res) => {
      const comDetail = res.data.data
      console.log(comDetail);
      const currentTime = new Date().getTime()
      const comDateString = comDetail.reviewEnd;
      const formattedComDateString = comDateString.replace(/\./g, "/");
      const comDate = new Date(formattedComDateString);
      localStorage.setItem("reviewEnd", comDateString)
      setIsEnd(currentTime > comDate.getTime())
      if (userState === 'approver') {
        getScoreWorkList(Number(comId), Number(page)).then((res) => {
          resDataProcessing(res, 'approver')
        })
      } else {
        getJudgeWorkList(Number(comId), Number(page)).then((res) => {
          console.log(res);
          resDataProcessing(res, 'judge');
          //   const result = res.data.data
          //   if (result === null) {
          //     setTimeout(() => {
          //       notification.info({
          //         message: '该页面没有数据,返回上一页',
          //         top: 20,
          //         placement: 'top',
          //       })
          //     }, 100)
          //     navigate('/review')
          //   }
          //   for (let i = 0; i < result.list.length; i++)
          //     result.list[i].isPass = result.list[i].isPass === true ? '通过' : '未通过'
          //   setDataList(result)
          //   setProgramList(result.list)
          //   localStorage.setItem('listTotal', res.data.data.total)
          //   setLoading(false)
        })
      }
    })

  }, [pageNum])



  const table = (
    <ProgramList
      loading={loading}
      role={userState}
      list={programList}
      pageNum={dataList.pageNum}
      total={dataList.total}
      pageSize={dataList.pageSize}
      getPageNum={getpageNum}
      isEnd={isEnd}
      isApproveCount={isApproveCount}
    />
  )
  return (
    <div className="manage">
      <TopBar />
      {table}
    </div>
  )
}

interface IProgramList {
  role: any
  list: any
  pageNum: number
  total: number
  pageSize: number
  getPageNum: any
  loading: boolean
  isEnd: boolean
  isApproveCount: number
}
// 表格内容
const ProgramList: React.FC<IProgramList> = (props: any) => {
  const [current, setCurrent] = useState(1)
  const { role, getPageNum, list, pageSize, total, loading, isEnd, isApproveCount } = props
  // const [id, setId] = useState(0)
  const navigate = useNavigate()

  // 修改页面内容
  const changePageNum = (current: number) => {
    setCurrent(current)
    getPageNum(current)
  }

  // 表头内容
  const columns: ColumnsType<DataType> = [
    {
      key: '1',
      title: '序号',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: '项目名称',
      dataIndex: 'title',
    },
    {
      key: '3',
      title: role === 'approver' ? '评分' : '通过与否',
      dataIndex: role === 'approver' ? 'score' : 'isPass',
    },
    {
      key: '4',
      title: role === 'approver' ? '评语' : '意见',
      dataIndex: 'opinion',
    },
    {
      key: '5',
      title: '状态',
      dataIndex: role === 'approver' ? 'isApprove' : 'isJudge',
      render: (data) => {
        if (role === 'approver') {
          return <Space>
            <Tag color={data ? "green" : "red"} key={data}>
              {data ? "已评分" : "未评分"}
            </Tag>
          </Space>
        } else {
          return (<Space>
            <Tag color={data ? "green" : "red"} key={data}>
              {data ? "已审核" : "未审核"}
            </Tag>
          </Space>)
        }
      }
    },
    {
      key: '6',
      title: '操作',
      render: () => (
        // render 返回一个组件
        <Space size="middle">
          {/* <Link to={`/review/detail/${id}`}> */}
          <Button className="count" type="primary" disabled={isEnd}>
            {
              isEnd ? "已结束" : (role === 'approver' ? '查看' : '审核')
            }
          </Button>
          {/* </Link> */}
        </Space>
      ),
    },
  ]

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div className="manage-content-header">
          <h1 className="manage-content-title">比赛项目列表</h1>
        </div>
        <div className="manage-content-statistic">
          <Statistic title="评审数量" value={isApproveCount} suffix={"/ " + total} />
          <Statistic title="评审截至日期" value={String(localStorage.getItem('reviewEnd'))} />
        </div>
        <div className="manage-content-table-body">
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            rowKey={(record) => record.id}
            onRow={(record) => {
              return {
                onClick: () => {
                  // setId(record.id)
                  console.log(record.id)
                  navigate(`/review/detail/${record.id}`)
                },
              }
            }}
            pagination={{
              pageSize: pageSize,
              total: total,
              onChange: (current) => {
                changePageNum(current)
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewList
