import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Button, notification, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './index.scss'
import { getScoreWorkList, getJudgeWorkList } from '../../api/judge'

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
  const [dataList, SetDataList] = useState<any>({})
  const userState = localStorage.getItem('userState')

  const [loading, setLoading] = useState(true)
  // 获取子组件中的页数
  const getpageNum = (current: number) => {
    setPageNum(current)
    navigate(`/review/list/${comId}/${current}`)
  }

  // 获取表格数据
  useEffect(() => {
    setLoading(true)
    if (userState === 'approver') {
      getScoreWorkList(Number(comId), Number(page)).then((res) => {
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
        SetDataList(res.data.data)
        localStorage.setItem('listTotal', res.data.data.total)
        setLoading(false)
      })
    } else {
      getJudgeWorkList(Number(comId), Number(page)).then((res) => {
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
        for (let i = 0; i < result.list.length; i++)
          result.list[i].isPass = result.list[i].isPass === 'true' ? '通过' : '未通过'
        SetDataList(result)
        localStorage.setItem('listTotal', res.data.data.total)
        setLoading(false)
      })
    }
  }, [pageNum])

  const table = (
    <ProgramList
      loading={loading}
      role={userState}
      list={dataList.list}
      pageNum={dataList.pageNum}
      total={dataList.total}
      pageSize={dataList.pageSize}
      getPageNum={getpageNum}
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
}
// 表格内容
const ProgramList: React.FC<IProgramList> = (props: any) => {
  const [current, setCurrent] = useState(1)
  const { role, getPageNum, list, pageSize, total, loading } = props
  const [id, setId] = useState(1)
  const rolestate = role === 'approver' ? '评审' : '审批'

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
      title: role === 'approver' ? '评分' : '通过与否',
      dataIndex: role === 'approver' ? 'score' : 'isPass',
      key: '3',
    },
    {
      title: role === 'approver' ? '评价' : '意见',
      dataIndex: 'opinion',
      key: '4',
    },
    {
      key: '5',
      title: '操作',
      render: () => (
        // render 返回一个组件
        <Space size="middle">
          <Link to={`/review/detail/${id}`}>
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
