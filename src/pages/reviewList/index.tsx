import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Button, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, Router, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import ReviewApprover from '../reviewApprover'
import ReviewJudge from '../reviewJudge'
import { getScoreWorkList, getJudgeWorkList } from '../../api/judge'
// import { getJudgeCompetitionList, getScoreCompetitionList } from '../../api/judge'

// 限制表格数据类型
interface DataType {
  id: number
  name: string
  score: number
  judge: string
}

// 表格数据
const data: DataType[] = [
  {
    id: 1,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
]

// 渲染审批界面
function ReviewList(props: any) {
  const { role } = props
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  // 当前页
  const [pageNum, setPageNum] = useState(1)
  // 页面数据
  const [dataList, SetDataList] = useState<any>({})

  // 获取子组件中的页数
  const getpageNum = (current: number) => {
    setPageNum(current)
    const params = search.slice(1).split('&')
    const comId = Number(params[0].split('=')[1])
    navigate(`/review/list?comId=${comId}&page=${current}`)
  }

  // 获取表格数据
  useEffect(() => {
    if (role === 'judge') {
      const params = search.slice(1).split('&')
      const comId = Number(params[0].split('=')[1])
      const page = Number(params[1].split('=')[1])
      getScoreWorkList(comId, page).then((res) => {
        SetDataList(res.data.data)
        console.log(dataList.list)
      })
    } else {
      const params = search.slice(1).split('&')
      const comId = Number(params[0].split('=')[1])
      const page = Number(params[1].split('=')[1])
      getScoreWorkList(comId, page).then((res) => {
        SetDataList(res.data.data)
      })
    }
  }, [pageNum])

  const table = (
    <ProgramList
      role={role}
      list={dataList.list}
      pageNum={dataList.pageNum}
      total={dataList.total}
      pageSize={dataList.pageSize}
      getPageNum={getpageNum}
    />
  )
  const detail = role === 'judge' ? <ReviewJudge /> : <ReviewApprover />
  if (pathname === '/review/list') {
    return (
      <div className="manage">
        <TopBar />
        {table}
      </div>
    )
  } else {
    return (
      <div className="manage">
        <TopBar />
        <div className="manage-content">{detail}</div>
      </div>
    )
  }
}

interface IProgramList {
  role: any
  list: any
  pageNum: number
  total: number
  pageSize: number
  getPageNum: any
}
// 表格内容
const ProgramList: React.FC<IProgramList> = (props: any) => {
  const [current, setCurrent] = useState(1)
  const { role, getPageNum, list, pageSize, total } = props
  const [id, setId] = useState(1)
  const rolestate = role === 'judge' ? '评审' : '审批'

  // 修改页面内容
  const changePageNum = (current: number) => {
    setCurrent(current)
    getPageNum(current)
  }

  // 表头内容
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      dataIndex: 'id',
      key: '1',
    },
    {
      title: '项目名称',
      dataIndex: 'title',
      key: '2',
    },
    {
      title: role === 'judge' ? '评分' : '通过与否',
      dataIndex: role === 'judge' ? 'score' : 'isPass',
      key: '3',
    },
    {
      title: role === 'judge' ? '评价' : '意见',
      dataIndex: 'opinion',
      key: '4',
    },
    {
      key: '5',
      title: '操作',
      render: () => (
        // render 返回一个组件
        <Space size="middle">
          <Link
            to={{
              pathname: `/review/detail?workId=` + id,
            }}
          >
            <Button className="count" type="primary">
              {rolestate}
            </Button>
          </Link>
        </Space>
      ),
    },
  ]

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <div className="manage-content-header">
            <h1 className="manage-content-title">活动项目列表</h1>
            {/* <div className="go-detail">
              <Link to="/review/detail">
                <Button type="primary">{rolestate}</Button>
              </Link>
            </div> */}
          </div>
          <div className="manage-content-table-body">
            <Table
              columns={columns}
              dataSource={list}
              rowKey={(record) => record.id}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setId(record.id)
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
    </div>
  )
}

export default ReviewList
