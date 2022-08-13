import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import ReviewApprover from '../reviewApprover'
import ReviewJudge from '../reviewJudge'
// import { getJudgeCompetitionList, getScoreCompetitionList } from '../../api/judge'

// 获取本地存储数据，主要是获取登陆人员身份
const userState = localStorage.getItem('userState')
// 根据角色更换按钮中的内容
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
  score: number
  judge: string
}
// 表头内容
const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
    key: '1',
  },
  {
    title: '评分',
    dataIndex: 'score',
    key: '2',
  },
  {
    title: '评价',
    dataIndex: 'judge',
    key: '3',
  },
]
// 表格数据
const data: DataType[] = [
  {
    id: 1,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 2,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 3,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 4,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 5,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 6,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 7,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 8,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 9,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 10,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
  {
    id: 11,
    name: 'yang',
    score: 4,
    judge: '很好',
  },
]

// 表格内容
function ProgramList() {
  const [current, setCurrent] = useState(1)
  if (userState === 'judge') {
    // const judgeCompetitionList = getJudgeCompetitionList(current).
  }
  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <div className="manage-content-header">
            <h1 className="manage-content-title">活动项目列表</h1>
            <div className="go-detail">
              <Link to="/review/detail">
                <Button type="primary">{role()}</Button>
              </Link>
            </div>
          </div>
          <div className="manage-content-table-body">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 9,
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
function ReviewList(props: { role: any }) {
  const { pathname } = useLocation()
  const role = props.role
  const table = <ProgramList />
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

export default ReviewList
