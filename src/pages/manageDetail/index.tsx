import { Button } from 'antd'
import React from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'
import StatisticsBox from './components'

function ManageDetail() {
  return (
    <div className="manage-detail">
      <TopBar activity='"挑战杯"创新创业大赛' />
      <div className="manage-detail-header">
        <p className="manage-detail-title">&quot;挑战杯&quot;创新创业大赛</p>
        <Button type="primary" size="small" id="manage-detail-set">
          设置
        </Button>
        <Button type="primary" size="small" id="manage-detail-notice">
          公告
        </Button>
        <Button type="primary" size="small" id="manage-detail-download-result">
          下载比赛结果
        </Button>
      </div>
      <div className="manage-detail-body">
        <div className="manage-detail-top">
          <Button type="primary" size="small" id="manage-detail-download-info">
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
      </div>
    </div>
  )
}

export default ManageDetail
