import { Button, Pagination, Spin, Result, Alert, Table } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCompetitionList } from '../../api/admin'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import ManageItem from './components/manageItem'
import './index.scss'

interface DataType {
  id: number
  name: string
  beginTime: string
  endTime: string
  introduce: string
  reviewer: string
  status: string
  regNum: number
  subNum: number
  revNum: number
}

const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '30',
    ellipsis: true,
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    width: '60',
    ellipsis: true,
  },
  {
    title: '开始日期',
    dataIndex: 'beginTime',
    width: '40',
    ellipsis: true,
  },
  {
    title: '结束日期',
    dataIndex: 'endTime',
    width: '40',
    ellipsis: true,
  },
  {
    title: '比赛简介',
    dataIndex: 'introduce',
    width: '60',
    ellipsis: true,
  },
  {
    title: '审批人员',
    dataIndex: 'regNum',
    width: '40',
    ellipsis: true,
  },
  {
    title: '活动状态',
    dataIndex: 'status',
    width: '50',
    ellipsis: true,
  },
  {
    title: '已报名队伍',
    dataIndex: 'regNum',
    width: '40',
    ellipsis: true,
  },
  {
    title: '已提交材料数',
    dataIndex: 'subNum',
    width: '40',
    ellipsis: true,
  },
  {
    title: '审批完毕数',
    dataIndex: 'revNum',
    width: '40',
    ellipsis: true,
  },
  {
    title: '导出Excel',
    dataIndex: 'id',
    width: '40',
    render: () => {
      return (
        <span
        //   onClick={() => {
        //     exportWorkFileDataToAssignScorer().then(
        //       (res) => {
        //         const blob = new Blob([res.data])
        //         const downloadElement = document.createElement('a')
        //         const href = window.URL.createObjectURL(blob) //创建下载的链接
        //         downloadElement.href = href
        //         downloadElement.download = value.name + '参赛数据.xlsx' //下载后文件名
        //         document.body.appendChild(downloadElement)
        //         downloadElement.click() //点击下载
        //         document.body.removeChild(downloadElement) //下载完成移除元素
        //         window.URL.revokeObjectURL(href) //释放掉blob对象
        //         setTimeout(() => {
        //           notification.success({
        //             message: '😸️ 导出成功',
        //             description: value.name + '的参赛数据已导出',
        //             top: 20,
        //             placement: 'top',
        //           })
        //         }, 100)
        //       },
        //       (error) => {
        //         setTimeout(() => {
        //           notification.error({
        //             message: '😭️ 导出失败',
        //             description: value.name + '的参赛数据未能成功导出',
        //             top: 20,
        //             placement: 'top',
        //           })
        //         }, 100)
        //       },
        //     )
        //   }
        // }
        >
          导出
        </span>
      )
    },
  },
  {
    title: '发布公告',
    dataIndex: 'id',
    width: '40',
    render: () => {
      return (
        <span
        // onClick={() => {
        //   toPostNotice(value.name, value.id)
        // }}
        >
          发布公告
        </span>
      )
    },
  },
  {
    title: '编辑活动',
    dataIndex: 'id',
    width: '40',
    render: () => {
      return (
        <span
        // onClick={() => {
        //   toEditCompetition(value.id, value.name)
        // }}
        >
          编辑
        </span>
      )
    },
  },
]

const Manage: React.FC = () => {
  // 路由
  const Navigate = useNavigate()
  // 保存页码状态的 state
  const [pageState, setPageState] = useState<{ pageNumber: number; pageSize: number; total: number; records: [] }>({
    pageNumber: 1,
    pageSize: 9,
    total: 0,
    records: [],
  })

  // 保存 是否在加载 的状态的 state
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
          return a
        })
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [pageState.pageNumber])

  // 页码
  const onChange: PaginationProps['onChange'] = (page) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.pageNumber = page
      return a
    })
  }

  // 跳转到发布公告的界面
  const toPostNotice = (competitionName: string, competitionId: number) => {
    Navigate('./' + competitionId + '/notice/', {
      state: { competitionName: competitionName, competitionId: competitionId },
    })
  }

  //跳转到编辑界面
  const toEditCompetition = (competitionId: number, name: string) => {
    Navigate('../activity/' + competitionId + '/manage', {
      state: { competitionId: competitionId, competitionName: name },
    })
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
      <div className="manage-body-no-repeat">
        <div className="manage-body-list">
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
          </div>
          {/* <div className='table-container'>
          <Table pagination={false} columns={columns} dataSource={pageState.records} />
          </div>
          若启用改模块，需要将 234 行代码到 272 行代码注释掉 
          */}
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
