import React from 'react'
import { notification } from 'antd'
import { exportWorkFileDataToAssignScorer } from '../../../api/admin'
type ManageItemType = {
  index: number
  toPostNotice: (competitionName: string, competitionId: number) => void
  toEditCompetition: (competition: number, name: string) => void
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
        <span style={{ width: '2.5%' }}>{value.id}</span>
        <span style={{ width: '12%' }}>{value.name}</span>
        <span style={{ width: '6.8%' }}>{value.beginTime.substring(0, 10)}</span>
        <span style={{ width: '6.8%' }}>{value.endTime.substring(0, 10)}</span>
        <span style={{ width: '13.2%' }}>{value.introduce}</span>
        <span style={{ width: '9.3%' }}>{value.reviewer}</span>
        <span style={{ width: '5%' }}>{value.status}</span>
        <span style={{ width: '6.1%' }}>{value.regNum}</span>
        <span style={{ width: '7.5%' }}>{value.subNum}</span>
        <span style={{ width: '8.2%', margin: '0 70px 0 0' }}>{value.revNum}</span>
        <span
          style={{ width: '5.9%', color: 'rgba(42, 130, 228, 1)' }}
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
          style={{ width: '6.4%', color: 'rgba(42, 130, 228, 1)' }}
          onClick={() => {
            toPostNotice(value.name, value.id)
          }}
        >
          发布公告
        </span>
        <span
          style={{ width: '6.4%', color: 'rgba(42, 130, 228, 1)' }}
          onClick={() => {
            toEditCompetition(value.id, value.name)
          }}
        >
          编辑
        </span>
      </div>
    </div>
  )
}
export default ManageItem
