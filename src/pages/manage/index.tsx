import { Button, Pagination, Spin, Result, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import type { PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCompetitionList } from '../../api/admin'
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
  //路由
  const Navigate = useNavigate()
  // 保存页码状态的 state
  const [pageState, setPageState] = useState<{ pageNumber: number; pageSize: number; total: number; records: [] }>({
    pageNumber: 1,
    pageSize: 9,
    total: 0,
    records: [],
  })
  //保存 是否在加载 的状态的 state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    setIsLoading(true)
    getCompetitionList(pageState.pageNumber, pageState.pageSize)
      .then((res) => {
        console.log(res)
        setPageState((pre) => {
          const a = { ...pre }
          a.total = res.data.data.total
          a.records = res.data.data.records
          console.log(a.records)
          return a
        })
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [pageState.pageNumber])
  //页码
  const onChange: PaginationProps['onChange'] = (page) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.pageNumber = page
      return a
    })
  }
  //跳转到发布公告的界面
  const toPostNotice = (competitionId: number) => {
    Navigate('./' + competitionId + '/notice/')
  }
  //跳转到编辑界面
  const toEditCompetition = (competitionId: number) => {
    Navigate('../activity/' + competitionId + '/manage')
  }
  //路由
  const loadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
  return (
    <div>
      <TopBar />
      <div className="manage-header">
        <h1 id="manage-header-title">活动管理</h1>
        <Button type="primary" size="small" onClick={() => Navigate('./create')}>
          创建活动
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
            <span className="manage-body-title-team-number">已报名队伍</span>
            <span className="manage-body-title-work-number">已提交材料数</span>
            <span className="manage-body-title-judged-number">审批完毕数</span>
            <span className="manage-body-title-export">导出Excel</span>
            <span className="manage-body-title-post-notice">发布公告</span>
            <span className="manage-body-title-edit-competition">编辑活动</span>
          </div>
          <div className="manage-body-items">
            {isLoading ? (
              <Spin tip="^_^数据加载中……" className="loading" size="large" indicator={loadingIcon}></Spin>
            ) : pageState.records.length === 0 ? (
              <Result
                style={{ margin: '0 auto' }}
                status="404"
                title="没有活动数据"
                subTitle="现在好像没有活动,快去创建活动吧！"
              />
            ) : (
              pageState.records.map((value, index) => {
                return (
                  <ManageItem
                    index={index}
                    key={pageState.pageNumber + ' ' + index}
                    value={value}
                    toPostNotice={toPostNotice}
                    toEditCompetition={toEditCompetition}
                  />
                )
              })
            )}
            {/* <ManageItem page={pageState} index={1} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={2} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={3} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={4} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={5} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={6} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={7} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={8} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} />
            <ManageItem page={pageState} index={9} toPostNotice={toPostNotice} toEditCompetition={toEditCompetition} /> */}
          </div>
          <div className="manage-body-page">
            <Pagination
              current={pageState.pageNumber}
              pageSize={pageState.pageSize}
              showSizeChanger={false}
              onChange={onChange}
              total={pageState.total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manage
