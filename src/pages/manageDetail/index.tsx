import { Button, Result, Spin, notification, Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'
import DataTable from './components/dataTable'
import {
  exportWorkFileDataToAssignScorer,
  exportTeamInfo,
  exportJudgeResult,
  getManageCompetitionList,
  assignJudge,
} from '../../api/admin'
import StatisticsBox from './components'
import { useNavigate, useLocation } from 'react-router-dom'

type DataType = {
  index: number
  comId: number
  fileId: number
  fileName: string
  isAssignJudge: number
  judges: string[]
}

// 用于替代 location 的泛型
function useMyLocation<T>() {
  return useLocation() as { state: T }
}
function ManageDetail() {
  const [uploadFile, setUploadFile] = useState<FormData>(new FormData())
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageState, setPageState] = useState<{ total: number; pageNumber: number; pageSize: number }>({
    total: 0,
    pageNumber: 1,
    pageSize: 10,
  })
  const [regState, setRegState] = useState<{ regNum: number; revNum: number; subNum: number }>({
    regNum: 0,
    revNum: 0,
    subNum: 0,
  })
  const navigate = useNavigate()
  const [data, setData] = useState<DataType[]>([])
  const { state } = useMyLocation<{ competitionId: number; competitionName: string }>()

  //导出所有参赛队伍 可用于分配评委
  const exportCompetitionTeam = () => {
    exportWorkFileDataToAssignScorer(state.competitionId)
      .then((res) => {
        console.log(res)
        // if (res.data.success) {
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = state.competitionName + ' 的参赛数据.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: '活动： ' + state.competitionName + ' 的参赛数据已导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
        // } else {
        //   setTimeout(() => {
        //     notification.error({
        //       message: '😭️ 导出失败',
        //       description: state.competitionName + ' 的参赛数据未能成功导出',
        //       top: 20,
        //       placement: 'top',
        //     })
        //   }, 100)
        // }
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: '活动： ' + state.competitionName + ' 的参赛数据未能成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }
  //导出所有附件的信息
  const exportTeamFileInfo = () => {
    exportTeamInfo(state.competitionId)
      .then((res) => {
        // if (res.data.success) {
        console.log(res)
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = state.competitionName + ' 的附件.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: '活动： ' + state.competitionName + ' 的所有附件已成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
        //   } else {
        //     console.log(res)
        //     setTimeout(() => {
        //       notification.error({
        //         message: '😭️ 导出失败',
        //         description: '未能成功导出 ' + state.competitionName + ' 的附件',
        //         top: 20,
        //         placement: 'top',
        //       })
        //     }, 100)
        //   }
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: '未能成功导出 ' + state.competitionName + ' 的附件',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  // 下载活动评审结果
  const exportCompetitionResult = () => {
    exportJudgeResult(state.competitionId)
      .then((res) => {
        // if (res.data.success) {
        const blob = new Blob([res.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = state.competitionName + ' 的评审结果.xlsx' //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
        setTimeout(() => {
          notification.success({
            message: '😸️ 导出成功',
            description: '活动： ' + state.competitionName + ' 的评审结果已成功导出',
            top: 20,
            placement: 'top',
          })
        }, 100)
        // } else {
        //   setTimeout(() => {
        //     notification.error({
        //       message: '😭️ 导出失败',
        //       description: '未能成功导出活动:' + state.competitionName + ' 的评审结果',
        //       top: 20,
        //       placement: 'top',
        //     })
        //   }, 100)
        // }
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 导出失败',
            description: '未能成功导出活动:' + state.competitionName + ' 的评审结果',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  // 导入评审
  const upLoadJudges = () => {
    if (uploadFile.has('file')) {
      assignJudge(uploadFile)
        .then((res) => {
          if (res.data.success) {
            setTimeout(() => {
              notification.success({
                message: '😸️ 导入成功',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else {
            setTimeout(() => {
              notification.error({
                message: '😭️ 导入失败',
                description: res.data.errMsg,
                top: 20,
                placement: 'top',
              })
            }, 100)
          }
        })
        .catch((error) => {
          setTimeout(() => {
            notification.error({
              message: '😭️ 导入失败',
              top: 20,
              placement: 'top',
            })
          }, 100)
        })
    } else {
      setTimeout(() => {
        notification.error({
          message: '请先上传文件！',
          top: 20,
          placement: 'top',
        })
      }, 100)
    }
  }

  // pageNum 变化时
  const onPageNumChange: PaginationProps['onChange'] = (page) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.pageNumber = page
      return a
    })
  }

  useEffect(() => {
    setIsLoading(true)
    getManageCompetitionList(state.competitionId, pageState.pageNumber, pageState.pageSize)
      .then((res) => {
        setRegState({ regNum: res.data.data.regNum, subNum: res.data.data.subNum, revNum: res.data.data.revNum })
        setData(res.data.data.records)
        console.log(res.data.data)
        setPageState((pre) => {
          const a = { ...pre }
          a.total = res.data.data.total
          return a
        })
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
      })
  }, [pageState.pageNumber])

  const loadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />
  return (
    <div className="manage-detail">
      <TopBar activity='"挑战杯"创新创业比赛' />
      <div className="manage-detail-header">
        <p className="manage-detail-title">{state.competitionName}</p>
        <Button
          type="primary"
          size="small"
          id="manage-detail-set"
          onClick={() => {
            navigate('/activity/' + state.competitionId + '/manage/create', {
              state: { competitionId: state.competitionId },
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
            navigate('../manage/' + state.competitionId + '/notice', {
              state: { competitionId: state.competitionId },
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
          <Button
            type="primary"
            size="small"
            id="manage-detail-reviewer"
            onClick={() => {
              upLoadJudges()
            }}
          >
            导入评委分配
          </Button>
          <input
            type="file"
            accept="application/ms-excel"
            name="fileName"
            id="manage-detail-uplord"
            onChange={(e) => {
              if (e.target.files !== null) {
                const formdata = new FormData()
                formdata.append('file', (e.target.files as FileList)[0] as Blob)
                setUploadFile(formdata)
              }
            }}
          />
          <StatisticsBox name="approve" num={regState.revNum} />
          <StatisticsBox name="submit" num={regState.subNum} />
          <StatisticsBox name="regist" num={regState.regNum} />
        </div>
        <div className="manage-detail-list">
          <div className="manage-detail-list-title">
            <div className="manage-detail-list-title-index">序号</div>
            <div className="manage-detail-list-title-fileName">项目名称</div>
            <div className="manage-detail-list-title-judges">评委</div>
            <div className="manage-detail-list-title-export">导出</div>
          </div>
          <div className="manage-detail-list-content-body">
            {isLoading ? (
              <Spin tip="^_^数据加载中……" className="loading" size="large" indicator={loadingIcon}></Spin>
            ) : data.length === 0 ? (
              <Result
                style={{ margin: '0 auto' }}
                status="404"
                title="没有数据"
                subTitle="现在好像没有提交的作品，再等等吧！"
              />
            ) : (
              data.map((value, index) => {
                return (
                  <DataTable key={value.fileName + ' ' + index} pageState={pageState} value={value} index={index} />
                )
              })
            )}
          </div>
        </div>
        <div className="manage-detail-page">
          <Pagination
            current={pageState.pageNumber}
            pageSize={pageState.pageSize}
            showSizeChanger={false}
            onChange={onPageNumChange}
            total={pageState.total}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageDetail
