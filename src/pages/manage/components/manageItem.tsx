import React from 'react'
import { notification } from 'antd'
import { exportWorkFileDataToAssignScorer } from '../../../api/admin'
type ManageItemType = {
  index: number
  toPostNotice: (competition: number) => void
  toEditCompetition: (competition: number) => void
  value: {
    id: number //活动id
    name: string //活动名字
    beginTime: string //开始时间
    endTime: string //结束时间
    introduce: string //活动介绍
    reviewer: string //审批人
    status: string //活动状态
    regNum: number //已报名人数
    subNum: number // 已提交材料人数
    revNum: number //已审批完毕人数
  }
}
const ManageItem: React.FC<ManageItemType> = (props) => {
  const { index, value, toEditCompetition, toPostNotice } = props
  return (
    <div className={index % 2 === 0 ? 'manage-body-odd' : 'manage-body-even'}>
      <div className="manage-body-item">
        <span className="manage-body-item-ID">{value.id}</span>
        <span className="manage-body-item-name">{value.name}</span>
        <span className="manage-body-item-begin-time">{value.beginTime.substring(0, 10)}</span>
        <span className="manage-body-item-end-time">{value.endTime.substring(0, 10)}</span>
        <span className="manage-body-item-introduce">{value.introduce}</span>
        <span className="manage-body-item-review-state">{value.reviewer}</span>
        <span className="manage-body-item-competition-state">{value.status}</span>
        <span className="manage-body-item-team-number">{value.regNum}</span>
        <span className="manage-body-item-work-number">{value.subNum}</span>
        <span className="manage-body-item-judged-number">{value.revNum}</span>
        <span
          className="manage-body-item-export"
          onClick={() => {
            exportWorkFileDataToAssignScorer(value.id).then(
              (res) => {
                const blob = new Blob([res.data])
                const downloadElement = document.createElement('a')
                const href = window.URL.createObjectURL(blob) //创建下载的链接
                downloadElement.href = href
                downloadElement.download = value.name + '参赛数据.xlsx' //下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() //点击下载
                document.body.removeChild(downloadElement) //下载完成移除元素
                window.URL.revokeObjectURL(href) //释放掉blob对象
                setTimeout(() => {
                  notification.success({
                    message: '😸️ 导出成功',
                    description: value.name + '的参赛数据已导出',
                    top: 20,
                    placement: 'top',
                  })
                }, 100)
              },
              (error) => {
                setTimeout(() => {
                  notification.error({
                    message: '😭️ 导出失败',
                    description: value.name + '的参赛数据未能成功导出',
                    top: 20,
                    placement: 'top',
                  })
                }, 100)
              },
            )
          }}
        >
          导出
        </span>
        <span
          className="manage-body-item-post-notice"
          onClick={() => {
            toPostNotice(value.id)
          }}
        >
          发布公告
        </span>
        <span
          className="manage-body-item-edit-competition"
          onClick={() => {
            toEditCompetition(value.id)
          }}
        >
          编辑
        </span>
      </div>
    </div>
  )
}
export default ManageItem
