import { Button, Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import ManageItem from './components/manageItem'
import './index.scss'

interface DataType {
  key: number //
  index: number //
  name: string //
  start: string //
  end: string //
  des: string //
  reviewer: string //
  state: string //
  regist: number //
  submit: number //
  finish: number //
}

const Manage: React.FC = () => {
  const [pageState, setPageState] = useState(1)
  const onChange: PaginationProps['onChange'] = (page) => {
    setPageState(page)
  }
  const Navigate = useNavigate()
  return (
    <div>
      <TopBar />
      <div className="manage-header">
        <h1 id="manage-header-title">活动管理</h1>
        <Button type="primary" size="small" onClick={() => Navigate('./create')}>
          创建比赛
        </Button>
      </div>
      <div className="manage">
        <div className="manage-body">
          <div className="manage-body-title">
            <span className="manage-body-title-ID">序号</span>
            <span className="manage-body-title-name">名称</span>
            <span className="manage-body-title-begin-time">开始日期</span>
            <span className="manage-body-title-end-time">结束日期</span>
            <span className="manage-body-title-introduce">比赛简介</span>
            <span className="manage-body-title-review-state">审批人员</span>
            <span className="manage-body-title-competition-state">活动状态</span>
            <span className="manage-body-title-team-number">已报名人数</span>
            <span className="manage-body-title-work-number">已提交材料人数</span>
            <span className="manage-body-title-judged-number">已审批完毕人数</span>
            <span className="manage-body-title-export">导出Excel</span>
            <span className="manage-body-title-post-notice">发布公告</span>
            <span className="manage-body-title-edit-competition">修改活动</span>
          </div>
          <div className="manage-body-items">
            <ManageItem page={pageState} index={1} />
            <ManageItem page={pageState} index={2} />
            <ManageItem page={pageState} index={3} />
            <ManageItem page={pageState} index={4} />
            <ManageItem page={pageState} index={5} />
            <ManageItem page={pageState} index={6} />
            <ManageItem page={pageState} index={7} />
            <ManageItem page={pageState} index={8} />
            <ManageItem page={pageState} index={9} />
          </div>
          <div className="manage-body-page">
            <Pagination current={pageState} pageSize={9} showSizeChanger={false} onChange={onChange} total={9} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manage
