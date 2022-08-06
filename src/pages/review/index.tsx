import React from 'react'
import TopBar from '../../components/TopBar'
import { Space, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation } from 'react-router-dom'
import ReviewDetail from '../reviewDetail'
import './index.scss'

interface DataType {
  id: number
  name: string
  notreviewed: number
  reviewed: number
  start_date: string
  end_date: string
}
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
            审批
          </Button>
        </Link>
      </Space>
    ),
  },
]
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

function Review() {
  const { pathname } = useLocation()
  console.log(pathname)

  if (pathname === '/review') {
    return (
      <div className="manage">
        <TopBar />
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
      </div>
    )
  } else {
    return (
      <div className="manage">
        <TopBar />
        <div className="manage-content">
          <ReviewDetail />
        </div>
      </div>
    )
  }
}

export default Review
