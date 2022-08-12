import { CalendarOutlined } from '@ant-design/icons'
import { Button, Input, Radio } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'

function Notice() {
  return (
    <div className="activity-notice">
      <TopBar activity='"挑战杯"创新创业大赛' />
      <p id="activity-notice-header">发布公告</p>
      <div className="activity-notice-body">
        <div className="activity-notice-title">
          <p id="activity-notice-title">公告标题：</p>
          <Input placeholder="请输入公告标题" />
        </div>
        <div className="activity-notice-content">
          <p>公告内容：</p>
          <TextArea placeholder="请输入公告内容" rows={11} />
        </div>
        <div className="activity-notice-people">
          <p>面向对象：</p>
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>选手</Radio>
            <Radio value={3}>评委</Radio>
            <Radio value={4}>审批人</Radio>
          </Radio.Group>
        </div>
        <div className="activity-notice-operation">
          <Button type="primary" size="small" icon={<CalendarOutlined />}>
            保存
          </Button>
          <Button type="primary" size="small">
            发布
          </Button>
          <Button type="primary" size="small">
            删除
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Notice
