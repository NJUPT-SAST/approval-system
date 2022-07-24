import React from 'react'
import TopBar from '../../components/TopBar'
import { Space, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import ReviewApprover from '../reviewApprover'
import ReviewJudge from '../reviewJudge'

// 获取本地存储数据，主要是获取登陆人员身份
const userState = localStorage.getItem('userState')
const role = () => {
  switch (userState) {
    case 'judge':
      return '评审'
    case 'approver':
      return '审批'
    default:
      return '评审'
  }
}
// 限制表格数据类型
interface DataType {
  id: number
  name: string
  notreviewed: number
  reviewed: number
  start_date: string
  end_date: string
}
// 表头内容
const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '比赛名称',
    dataIndex: 'name',
    key: 'id',
  },
  {
    title: '待评审数',
    dataIndex: 'notreviewed',
    key: 'id',
  },
  {
    title: '已评审数',
    dataIndex: 'reviewed',
    key: 'id',
  },
  {
    title: '评审开始日期',
    dataIndex: 'start_date',
    key: 'id',
  },
  {
    title: '评审截止日期',
    dataIndex: 'end_date',
    key: 'id',
  },
  {
    title: '操作',
    render: () => (
      // render 返回一个组件
      <Space size="middle">
        <Link to="/review/detail">
          <Button className="count" type="primary" key="1">
            {role()}
          </Button>
        </Link>
      </Space>
    ),
  },
]
// 表格数据
const data: DataType[] = [
  {
    id: 1,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 2,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 3,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 4,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 5,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 6,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 7,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 8,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 9,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 10,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
  {
    id: 11,
    name: 'yang',
    notreviewed: 4,
    reviewed: 2,
    start_date: '2022年7月10日',
    end_date: '2022年7月20日',
  },
]
// 身份为评审人员时表格内容
function JudgeReview() {
  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动评审</h1>
          <div className="manage-content-table-body">
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 9 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
// 身份为审批人员时表格内容
function ApproverReview() {
  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动审批</h1>
          <div className="manage-content-table-body">
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 9 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
// 渲染审批界面
function Review(props: { role: any }) {
  const { pathname } = useLocation()
  const role = props.role
  const table = role === 'judge' ? <JudgeReview /> : <ApproverReview />
  const detail = role === 'judge' ? <ReviewJudge /> : <ReviewApprover />
  if (pathname === '/review') {
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

export default Review
