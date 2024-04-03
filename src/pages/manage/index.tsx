import { Button, Pagination, Spin, Result } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
// import type { ColumnsType } from 'antd/es/table'
import type { PaginationProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { getCompetitionList } from '../../api/admin'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import ManageItem from './components/manageItem'
import './index.scss'

// 下面是 antd Table 组件的一些属性
// interface DataType {
//   id: number
//   name: string
//   beginTime: string
//   endTime: string
//   introduce: string
//   reviewer: string
//   status: string
//   regNum: number
//   subNum: number
//   revNum: number
// }
// 使用时需要设置 width 属性
// const columns: ColumnsType<DataType> = [
//   {
//     title: '序号',
//     dataIndex: 'id',
//     ellipsis: true,
//   },
//   {
//     title: '活动名称',
//     dataIndex: 'name',
//     ellipsis: true,
//   },
//   {
//     title: '开始日期',
//     dataIndex: 'beginTime',
//     ellipsis: true,
//   },
//   {
//     title: '结束日期',
//     dataIndex: 'endTime',
//     ellipsis: true,
//   },
//   {
//     title: '比赛简介',
//     dataIndex: 'introduce',
//     ellipsis: true,
//   },
//   {
//     title: '审批人员',
//     dataIndex: 'regNum',
//     ellipsis: true,
//   },
//   {
//     title: '活动状态',
//     dataIndex: 'status',
//     ellipsis: true,
//   },
//   {
//     title: '已报名队伍',
//     dataIndex: 'regNum',
//     ellipsis: true,
//   },
//   {
//     title: '已提交材料数',
//     dataIndex: 'subNum',
//     ellipsis: true,
//   },
//   {
//     title: '审批完毕数',
//     dataIndex: 'revNum',
//     ellipsis: true,
//   },
//   {
//     title: '导出Excel',
//     dataIndex: 'id',
//     render: () => {
//       return (
//         <span
//         //这里应该有一个 axios 请求，用于请求导出文件
//         >
//           导出
//         </span>
//       )
//     },
//   },
//   {
//     title: '发布公告',
//     dataIndex: 'id',
//     render: () => {
//       return (
//         <span
//         // 这里应有一个 路由跳转，跳转至公告界面
//         >
//           发布公告
//         </span>
//       )
//     },
//   },
//   {
//     title: '编辑活动',
//     dataIndex: 'id',
//     render: () => {
//       return (
//         <span
//         // 这里应有一个路由跳转 跳转至对应的 manageDetail 组件
//         >
//           编辑
//         </span>
//       )
//     },
//   },
// ]

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
        // console.log(res)
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
        // console.log(error)
      })
  }, [pageState.pageNumber, pageState.pageSize])

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
    Navigate('../activity/' + competitionId + '/notice', {
      state: { competitionName: competitionName, competitionId: competitionId },
    })
  }

  //路由
  const loadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
  return (
    <div>
      <TopBar />
      <div className="manage-header">
        {/* <h1 id="manage-header-title">活动管理</h1> */}
        <Button type="primary" onClick={() => Navigate('./create')}>
          创建比赛
        </Button>
      </div>
      <div className="manage-body-no-repeat">
        <div className="manage-body-list">
          <div className="manage-body-title">
            <span style={{ width: '2.5%' }}>序号</span>
            <span style={{ width: '12%' }}>名称</span>
            <span style={{ width: '6.8%' }}>开始日期</span>
            <span style={{ width: '6.8%' }}>结束日期</span>
            <span style={{ width: '13.2%' }}>比赛简介</span>
            <span style={{ width: '9.3%' }}>审核人员</span>
            <span style={{ width: '5%' }}>比赛状态</span>
            <span style={{ width: '6.1%' }}>已报名队伍</span>
            <span style={{ width: '7.5%' }}>已提交材料数</span>
            <span style={{ width: '8.2%', margin: '0 70px 0 0' }}>审核完毕数</span>
            <span style={{ width: '5.9%' }}>导出Excel</span>
            <span style={{ width: '6.4%' }}>发布公告</span>
            <span style={{ width: '6.4%' }}>管理比赛</span>
          </div>
          <div className="manage-body-items">
            {isLoading ? (
              <Spin tip="^_^数据加载中……" className="loading" size="large" indicator={loadingIcon}></Spin>
            ) : pageState.records.length === 0 ? (
              <Result
                style={{ margin: '0 auto' }}
                status="404"
                title="没有比赛数据"
                subTitle="现在好像没有比萨,快去创建比赛吧！"
              />
            ) : (
              pageState.records.map((value, index) => {
                return (
                  <ManageItem
                    index={index}
                    key={pageState.pageNumber + ' ' + index}
                    value={value}
                    toPostNotice={toPostNotice}
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
