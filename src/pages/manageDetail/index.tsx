import { Button, Table, Select, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'
import { exportWorkFileDataToAssignScorer, exportTeamInfo, exportJudgeResult } from '../../api/admin'
import StatisticsBox from './components'
import { ColumnsType } from 'antd/es/table'
import { useNavigate, useLocation } from 'react-router-dom'

interface DataType {
  key: React.Key
  index: number
  name: string
  reviewer: string
  score: string
  evaluation: string
  choose: any
}

const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    key: 'index',
    dataIndex: 'index',
    width: 30,
  },
  {
    title: '项目名称',
    key: 'name',
    dataIndex: 'name',
    width: 250,
  },
  {
    title: '评委',
    key: 'reviewer',
    dataIndex: 'reviewer',
    width: 120,
  },
  {
    title: '评分',
    key: 'score',
    dataIndex: 'score',
    width: 65,
  },
  {
    title: '评价',
    key: 'evaluation',
    dataIndex: 'evaluation',
    width: 600,
  },
  {
    title: '',
    key: 'choose',
    dataIndex: 'choose',
  },
]
// 用于替代 location 的泛型
function useMyLocation<T>() {
  return useLocation() as { state: T }
}

function ManageDetail() {
  const [data, setData]: any = useState([])
  const [reviewer] = useState(['Max评审', 'Ming评审', 'R评审'])
  const navigate = useNavigate()
  const location = useMyLocation<{ competitionId: number; competitionName: string }>()
  // string
  useEffect(() => {
    if (data.length !== 0) {
      return
    }
    //生成一点造假数据×
    setData((data: DataType[]) => {
      for (let i = 0; i < 300; ++i) {
        const flag = i >= 4
        data.push({
          key: i,
          index: 114514,
          name: '随便取个名字就好了',
          reviewer: flag ? '未分配' : '随便了',
          score: flag ? '/' : '100',
          evaluation: flag ? '无' : '好耶！',
          choose: flag ? (
            <Select
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value: string) => {
                setData((data: DataType[]) => {
                  data[i].reviewer = value
                  return [...data]
                })
              }}
            >
              {reviewer.map((value, index) => {
                return (
                  <Select.Option key={index} value={value}>
                    {value}
                  </Select.Option>
                )
              })}
            </Select>
          ) : (
            <></>
          ),
        })
      }
      return [...data]
    })
  }, [])
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
  return (
    <div className="manage-detail">
      <TopBar activity='"挑战杯"创新创业比赛' />
      <div className="manage-detail-header">
        <p className="manage-detail-title">&quot;挑战杯&quot;创新创业大赛</p>
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
            navigate('../manage/' + location.state.competitionId + '/notice')
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
          <Table
            columns={columns}
            dataSource={data}
            rowClassName={(record, index) => {
              //奇偶行不同样式
              return index % 2 === 0 ? 'manage-detail-list-odd' : 'manage-detail-list-even'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageDetail
