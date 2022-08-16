import React from 'react'

type ManageItemType = {
  page: number
  index: number
}
const ManageItem: React.FC<ManageItemType> = (props) => {
  const { page, index } = props
  return (
    <div className={index % 2 === 1 ? 'manage-body-odd' : 'manage-body-even'}>
      <div className="manage-body-item">
        <span className="manage-body-item-ID">{(page - 1) * 10 + index}</span>
        <span className="manage-body-item-name">“挑战杯”创新创业比赛</span>
        <span className="manage-body-item-begin-time">2022-02-22</span>
        <span className="manage-body-item-end-time">2022-05-20</span>
        <span className="manage-body-item-introduce">比赛简介：本比赛标题好长好长长产啊啊啊啊啊</span>
        <span className="manage-body-item-review-state">审批人：李老师</span>
        <span className="manage-body-item-competition-state">进行中</span>
        <span className="manage-body-item-team-number">45</span>
        <span className="manage-body-item-work-number">37</span>
        <span className="manage-body-item-judged-number">16</span>
        <span className="manage-body-item-export">导出</span>
        <span className="manage-body-item-post-notice">发布公告</span>
        <span className="manage-body-item-edit-competition">编辑</span>
      </div>
    </div>
  )
}
export default ManageItem
