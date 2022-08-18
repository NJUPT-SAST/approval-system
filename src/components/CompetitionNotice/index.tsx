import { Button } from 'antd'
import React, { useState } from 'react'
import './index.scss'

type NoticeType = {
  role: number //角色 0代表普通学生 1表示评委 2表示审批人 3表示管理员
  title: string //公告标题
  content: string //公告内容
  time: string //公告发布时间
}
const CompetitionNotice: React.FC<NoticeType> = (props) => {
  //控制公告的折叠状态 true表示折叠 false表示未折叠
  const [foldState, setFoldState] = useState(true)
  const { role, title, content, time } = props
  return (
    <>
      <div className="competition-notice-nav">
        <Button
          type="primary"
          className="competition-notice-display-switch-button"
          onClick={() => {
            setFoldState(!foldState)
          }}
        >
          {' '}
        </Button>
      </div>
      {foldState ? ( //折叠后的
        <div className="competition-notice-body-fold">
          <div className="competition-notice-header">
            {title}
            <span className="competition-notice-footer-post">由 校大学生科协 发布于 {time}</span>
          </div>
        </div>
      ) : (
        //未折叠的
        <div className="competition-notice-body-unfold">
          <div className="competition-notice-header">{title}</div>
          <div className="competition-notice-content">{content}</div>
          <div className="competition-notice-footer">
            <div className="competition-notice-footer-post">
              由 校大学生科协 发布于 {time}
              {role === 3 ? (
                <div className="competition-notice-footer-button">
                  <Button type="primary">编辑</Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default CompetitionNotice