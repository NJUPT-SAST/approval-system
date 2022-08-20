import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Space, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation, Route, useNavigate } from 'react-router-dom'
import './index.scss'
import ReviewList from '../reviewList'
import { getJudgeCompetitionList, getScoreCompetitionList } from '../../api/judge'
import { DataListType } from '../../type/judgeTypes'
import ReviewApprover from '../reviewApprover'
import ReviewJudge from '../reviewJudge'

// 获取本地存储数据，判断登陆人员身份
const userState = localStorage.getItem('userState')
const role = () => {
  switch (userState) {
    case 'approver':
      return '评审'
    case 'judge':
      return '审批'
  }
}

// 渲染review主界面
const Review: React.FC = () => {
  const { pathname } = useLocation()
  const userState = localStorage.getItem('userState')
  // 当前页
  const [pageNum, setPageNum] = useState(1)
  // 页面数据
  const [dataList, SetDataList] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  // 获取子组件中的页数
  const getpageNum = (current: number) => {
    setPageNum(current)
  }

  /**
   * 获取表格数据
   * @param pageNum 当前页
   * @returns 表格数据
   */
  useEffect(() => {
    if (userState === 'judge') {
      setLoading(true)
      getJudgeCompetitionList(pageNum).then((res) => {
        SetDataList(res.data.data)
        setLoading(false)
      })
    } else {
      setLoading(true)
      getScoreCompetitionList(pageNum).then((res) => {
        SetDataList(res.data.data)
        setLoading(false)
      })
    }
  }, [pageNum])
  console.log(dataList)

  const list = <ReviewList />
  const detail = userState === 'approver' ? <ReviewApprover /> : <ReviewJudge />
  if (pathname === '/review') {
    // 渲染子组件
    const approverTable = (
      <ApproverReview
        loading={loading}
        getPageNum={getpageNum}
        list={dataList.list}
        pageNum={dataList.pageNum}
        total={dataList.total}
        pageSize={dataList.pageSize}
      />
    )
    const judgeTable = (
      <JudgeReview
        loading={loading}
        getPageNum={getpageNum}
        list={dataList.list}
        pageNum={dataList.pageNum}
        total={dataList.total}
        pageSize={dataList.pageSize}
      />
    )
    if (userState === 'approver') {
      return (
        <div className="manage" style={{ width: 'calc(100vw - 201px)' }}>
          <TopBar />
          {approverTable}
        </div>
      )
    } else {
      return (
        <div className="manage" style={{ width: 'calc(100vw - 201px)' }}>
          <TopBar />
          {judgeTable}
        </div>
      )
    }
  } else if (pathname === '/review/list') {
    return <div>{list}</div>
  } else if (pathname === '/review/detail') {
    return <div>{detail}</div>
  } else {
    navigate('/')
    return null
  }
}

interface IJudgeReview {
  list: any
  pageNum: number
  total: number
  pageSize: number
  getPageNum: any
  loading: boolean
}

// 身份为审批人员时表格内容
const JudgeReview: React.FC<IJudgeReview> = (props) => {
  const { getPageNum, list, total, pageSize, loading } = props
  // 表头内容
  const columns: ColumnsType<DataListType> = [
    {
      key: '1',
      title: '序号',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: '比赛名称',
      dataIndex: 'title',
    },
    {
      key: '3',
      title: '待评审数',
      dataIndex: 'totalNum',
    },
    {
      key: '4',
      title: '已评审数',
      dataIndex: 'completedNum',
    },
    {
      key: '5',
      title: '评审开始日期',
      dataIndex: 'startDate',
    },
    {
      key: '6',
      title: '评审截止日期',
      dataIndex: 'endDate',
    },
    {
      key: '7',
      title: '操作',
      render: () => (
        // render 返回一个组件
        <Space size="middle">
          <Link
            to={{
              pathname: `/review/list?comId=` + id + '&page=' + current,
            }}
          >
            <Button className="count" type="primary">
              {role()}
            </Button>
          </Link>
        </Space>
      ),
    },
  ]
  // 表格当前页数的声明、修改和传参
  const [current, setCurrent] = useState(1)
  const [id, setId] = useState(1)
  const changePageNum = (current: number) => {
    setCurrent(current)
    getPageNum(current)
  }

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动审批</h1>
          <div className="manage-content-table-body">
            <Table<DataListType>
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
// 身份为评审人员时表格内容
const ApproverReview: React.FC<IJudgeReview> = (props) => {
  const { getPageNum, list, total, pageSize, loading } = props
  // 表头内容
  const columns: ColumnsType<DataListType> = [
    {
      key: '1',
      title: '序号',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: '比赛名称',
      dataIndex: 'title',
    },
    {
      key: '3',
      title: '待评审数',
      dataIndex: 'totalNum',
    },
    {
      key: '4',
      title: '已评审数',
      dataIndex: 'completedNum',
    },
    {
      key: '5',
      title: '评审开始日期',
      dataIndex: 'startDate',
    },
    {
      key: '6',
      title: '评审截止日期',
      dataIndex: 'endDate',
    },
    {
      key: '7',
      title: '操作',
      render: () => (
        // render 返回一个组件
        <Space size="middle">
          <Link
            to={{
              pathname: `/review/list?comId=` + id + '&page=' + current,
            }}
          >
            <Button className="count" type="primary">
              {role()}
            </Button>
          </Link>
        </Space>
      ),
    },
  ]
  // 表格当前页数的声明、修改和传参
  const [current, setCurrent] = useState(1)
  const [id, setId] = useState(1)
  const changePageNum = (current: number) => {
    setCurrent(current)
    getPageNum(current)
  }

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动评审</h1>
          <div className="manage-content-table-body">
            <Table<DataListType>
              loading={loading}
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

export default Review
