import { Button, Table, Select, notification, Dropdown, Menu, Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'
import DataTable from './components/dataTable'
import {
  exportWorkFileDataToAssignScorer,
  exportTeamInfo,
  exportJudgeResult,
  getManageCompetitionList,
} from '../../api/admin'
import StatisticsBox from './components'
import { ColumnsType } from 'antd/es/table'
import { useNavigate, useLocation } from 'react-router-dom'

// interface DataType {
//   key: React.Key
//   index: number
//   name: string
//   reviewer: string
//   score: string
//   evaluation: string
//   choose: any
// }

type DataType = {
  index: number
  comId: number
  fileId: number
  fileName: string
  isAssignJudge: number
  judges: string[]
}
type columnsData = {
  key: number
  fileName: string
  judges: any
  export: any
}

// const columns: ColumnsType<DataType> = [
//   {
//     title: '序号',
//     key: 'index',
//     dataIndex: 'index',
//     width: 100,
//   },
//   {
//     title: '项目名称',
//     key: 'fileName',
//     dataIndex: 'fileName',
//   },

//   {
//     title: '评委',
//     key: 'judges',
//     dataIndex: 'judges',
//   },
//   {
//     title: '导出作品',
//     key: 'export',
//     dataIndex: 'export',
//   },
// ]
// 用于替代 location 的泛型
function useMyLocation<T>() {
  return useLocation() as { state: T }
}

function ManageDetail() {
  const [columnsData, setColumnsData]: any[] = useState([])
  const [pageState, setPageState] = useState<{ total: number; pageNumber: number; pageSize: number }>({
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  })
  // const [reviewer] = useState(['Max评审', 'Ming评审', 'R评审'])
  const navigate = useNavigate()
  const [data, setData] = useState<DataType[]>([])
  const location = useMyLocation<{ competitionId: number; competitionName: string }>()
  const createMenu = (index: number) => {
    if (data[index].isAssignJudge === 1) {
      const tempArray: any = []
      for (let i = 0; i < data[index].judges.length; i++) {
        tempArray.push({
          label: data[index].judges[i],
          key: i,
          icon: <UserOutlined />,
        })
      }
      return <Menu items={tempArray} />
    } else return <Menu></Menu>
  }
  // string
  // useEffect(() => {
  //   if (data.length !== 0) {
  //     return
  //   }
  //   //生成一点造假数据×
  //   setData((data: DataType[]) => {
  //     for (let i = 0; i < 300; ++i) {
  //       const flag = i >= 4
  //       data.push({
  //         key: i,
  //         index: 114514,
  //         name: '随便取个名字就好了',
  //         reviewer: flag ? '未分配' : '随便了',
  //         score: flag ? '/' : '100',
  //         evaluation: flag ? '无' : '好耶！',
  //         choose: flag ? (
  //           <Select
  //             showSearch
  //             placeholder="请选择"
  //             optionFilterProp="children"
  //             filterOption={(input, option) =>
  //               (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
  //             }
  //             onChange={(value: string) => {
  //               setData((data: DataType[]) => {
  //                 data[i].reviewer = value
  //                 return [...data]
  //               })
  //             }}
  //           >
  //             {reviewer.map((value, index) => {
  //               return (
  //                 <Select.Option key={index} value={value}>
  //                   {value}
  //                 </Select.Option>
  //               )
  //             })}
  //           </Select>
  //         ) : (
  //           <></>
  //         ),
  //       })
  //     }
  //     return [...data]
  //   })
  // }, [])

  //导出所有参赛队伍 可用于分配评委
  const exportCompetitionTeam = () => {
    exportWorkFileDataToAssignScorer(location.state.competitionId).then(
      (res) => {
        console.log()
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = location.state.competitionName + '参赛数据.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: location.state.competitionName + ' 的参赛数据已导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
      (error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: location.state.competitionName + ' 的参赛数据未能成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
    )
  }
  //导出附件信息
  const exportTeamFileInfo = () => {
    exportTeamInfo(location.state.competitionId).then(
      (res) => {
        console.log(res)
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = location.state.competitionName + '附件.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: location.state.competitionName + ' 的所有附件已成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
      (error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: '未能成功导出 ' + location.state.competitionName + ' 的附件',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
    )
  }
  //下载活动评审结果
  const exportCompetitionResult = () => {
    exportJudgeResult(location.state.competitionId).then(
      (res) => {
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = location.state.competitionName + '评审结果.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: '活动:' + location.state.competitionName + ' 的评审结果已成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
      (error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: '未能成功导出活动:' + location.state.competitionName + ' 的评审结果',
            top: 20,
            placement: 'top',
          })
        }, 100)
      },
    )
  }
  const onChange: PaginationProps['onChange'] = (page) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.pageNumber = page
      return a
    })
  }
  useEffect(() => {
    getManageCompetitionList(location.state.competitionId, 1, 10).then((res) => {
      console.log(res)
      setData(res.data.data.record)
    })
    // const tempArray: columnsData[] = []
    // for (let i = 0; i < data.length; i++) {
    //   const menu = createMenu(i)
    //   tempArray.push({
    //     key: i + 1,
    //     fileName: data[i].fileName,
    //     judges:
    //       data[i].isAssignJudge === 1 ? (
    //         <Dropdown.Button overlay={menu} disabled icon={<UserOutlined />}>
    //           未分配
    //         </Dropdown.Button>
    //       ) : (
    //         <Dropdown.Button overlay={menu} icon={<UserOutlined />}>
    //           已分配
    //         </Dropdown.Button>
    //       ),
    //     export: <Button>导出数据</Button>,
    //   })
    // }
    // setColumnsData(tempArray)
  }, [])

  return (
    <div className="manage-detail">
      <TopBar activity='"挑战杯"创新创业比赛' />
      <div className="manage-detail-header">
        <p className="manage-detail-title">{location.state.competitionName}</p>
        <Button
          type="primary"
          size="small"
          id="manage-detail-set"
          onClick={() => {
            navigate('/activity/' + location.state.competitionId + '/manage/create', {
              state: { competitionId: location.state.competitionId },
            })
          }}
        >
          修改活动
        </Button>
        <Button
          type="primary"
          size="small"
          id="manage-detail-notice"
          onClick={() => {
            console.log('now')
            navigate('../manage/' + location.state.competitionId + '/notice', {
              state: { competitionId: location.state.competitionId },
            })
          }}
        >
          发布公告
        </Button>
        <Button
          type="primary"
          size="small"
          id="manage-detail-download-result"
          onClick={() => {
            exportCompetitionResult()
          }}
        >
          下载活动结果
        </Button>
        <Button
          type="primary"
          size="small"
          id="manage-detail-download-work"
          onClick={() => {
            exportTeamFileInfo()
          }}
        >
          导出附件信息
        </Button>
      </div>

      <div className="manage-detail-body">
        <div className="manage-detail-top">
          <Button
            type="primary"
            size="small"
            id="manage-detail-download-info"
            onClick={() => {
              exportCompetitionTeam()
            }}
          >
            下载参赛信息
          </Button>
          <Button type="primary" size="small" id="manage-detail-reviewer">
            导入评委分配
          </Button>
          <span id="manage-detail-tips">限Excel文件，导入后会覆盖原有分配</span>
          <StatisticsBox name="approve" num={73} />
          <StatisticsBox name="submit" num={97} />
          <StatisticsBox name="regist" num={219} />
        </div>
        <div className="manage-detail-list">
          <div className="manage-detail-list-title">
            <div className="manage-detail-list-title-index">序号</div>
            <div className="manage-detail-list-title-fileName">项目名称</div>
            <div className="manage-detail-list-title-judges">评委</div>
            <div className="manage-detail-list-title-export">导出</div>
          </div>
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
          <DataTable />
        </div>
        <div className="manage-detail-page">
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
  )
}

export default ManageDetail
