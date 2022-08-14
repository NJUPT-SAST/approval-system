import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Space, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import ReviewList from '../reviewList'
import { getJudgeCompetitionList, getScoreCompetitionList } from '../../api/judge'

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
    key: '1',
    title: '序号',
    dataIndex: 'id',
  },
  {
    key: '2',
    title: '比赛名称',
    dataIndex: 'name',
  },
  {
    key: '3',
    title: '待评审数',
    dataIndex: 'notreviewed',
  },
  {
    key: '4',
    title: '已评审数',
    dataIndex: 'reviewed',
  },
  {
    key: '5',
    title: '评审开始日期',
    dataIndex: 'start_date',
  },
  {
    key: '6',
    title: '评审截止日期',
    dataIndex: 'end_date',
  },
  {
    key: '7',
    title: '操作',
    render: () => (
      // render 返回一个组件
      <Space size="middle">
        <Link
          to={{
            pathname: '/review/list',
            search: '?comId=1&page=1',
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
]

// 身份为评审人员时表格内容
const JudgeReview: React.FC = () => {
  const [current, setCurrent] = useState(1)
  // const [activeIndex, setActiveIndex] = useState(0)
  // const [listdata, setData] = useState({ data: [{}] })

  // 获取表格数据
  useEffect(() => {
    const fetchJudgeData = async () => {
      const result = await getJudgeCompetitionList(current)
    }
  })
  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动评审</h1>
          <div className="manage-content-table-body">
            <Table<DataType>
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 9,
                current: current,
                onChange: (current) => {
                  setCurrent(current)
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// 身份为审批人员时表格内容
const ApproverReview: React.FC = () => {
  // current 当前页码， activeIndex 点击的行的索引
  const [current, setCurrent] = useState(1)
  // const [activeIndex, setActiveIndex] = useState(0)
  const [data, setData] = useState()
  const judgeCompetitionList = () => {
    getJudgeCompetitionList(current)
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动审批</h1>
          <div className="manage-content-table-body">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 9,
                current: current,
                onChange: (current) => {
                  setCurrent(current)
                  // console.log(current);
                },
              }}
            />
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
  const detail = <ReviewList role={undefined} />
  if (pathname === '/review') {
    return (
      <div className="manage">
        <TopBar />
        {table}
      </div>
    )
  } else {
    return <div>{detail}</div>
  }
}

export default Review
