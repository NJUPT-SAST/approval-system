import React, { FC, ReactElement, useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import { Space, Button, Table } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import ReviewList from '../reviewList'
import { getJudgeCompetitionList, getScoreCompetitionList } from '../../api/judge'
import { DataType, DataListType } from '../../type/judgeTypes'
import { totalmem } from 'os'

// 获取本地存储数据，判断登陆人员身份
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

// 渲染审批界面
function Review(props: { role: any }) {
  const { pathname } = useLocation()
  const role = props.role
  // 当前页
  const [pageNum, setPageNum] = useState(1)
  // 页面数据
  const [dataList, SetDataList] = useState<DataType[]>([])

  /**
   * 获取表格数据
   * @param pageNum 当前页
   * @returns 表格数据
   */
  useEffect(() => {
    if (role === '审批') {
      getJudgeCompetitionList(pageNum).then((res) => {
        SetDataList(res.data.data)
      })
    } else {
      getScoreCompetitionList(pageNum).then((res) => {
        SetDataList(res.data.data)
      })
    }
  }, [pageNum])

  // console.log(dataList)

  // 渲染子组件
  const table =
    role === 'judge' ? (
      <JudgeReview list={[]} total={0} pageNum={0} pageSize={0} pages={0} isFirstPage={false} isLastPage={false} />
    ) : (
      <ApproverReview total={0} list={[]} pageNum={0} pageSize={0} pages={0} isFirstPage={false} isLastPage={false} />
    )
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

// 身份为评审人员时表格内容
const JudgeReview: FC<DataType> = ({ list, pageNum, total, pageSize }) => {
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
      dataIndex: 'name',
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
  // 修改当前页数
  const changePageNum = (current: number) => {
    pageNum = current
  }

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动评审</h1>
          <div className="manage-content-table-body">
            <Table<DataListType>
              columns={columns}
              dataSource={list}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    console.log(record)
                  },
                }
              }}
              pagination={{
                pageSize: pageSize,
                total: total,
                current: pageNum,
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
// 身份为审批人员时表格内容
const ApproverReview: FC<DataType> = ({ list, pageNum, total, pageSize }) => {
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
      dataIndex: 'name',
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
  // 修改当前页数
  const changePageNum = (current: number) => {
    pageNum = current
  }

  return (
    <div className="manage-content">
      <div className="manage-content-table">
        <div>
          <h1 className="manage-content-table-title">活动审批</h1>
          <div className="manage-content-table-body">
            <Table
              columns={columns}
              dataSource={list}
              pagination={{
                pageSize: pageSize,
                total: total,
                current: pageNum,
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
