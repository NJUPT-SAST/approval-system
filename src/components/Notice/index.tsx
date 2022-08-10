import { Button } from 'antd'
import React, { useState } from 'react'

type NoticeType = {
  role: number
  title: string
  content: string
  time: string
}
const Notice: React.FC<NoticeType> = (props) => {
  const [foldState, setFoldState] = useState(true)
  const { role, title, content, time } = props
  return (
    <>
      <div className={foldState ? 'notice-message-nav-unfold' : 'notice-message-nav-unfold'}>
        <Button
          type="primary"
          className="notice-message-display-switch-button"
          onClick={() => {
            setFoldState(!foldState)
          }}
        >
          {' '}
        </Button>
      </div>
      {foldState ? ( //折叠后的
        <div className="notice-message-body-fold">
          <div className="notice-message-header">
            {title}
            <span className="notice-message-footer-post">由 校大学生科协 发布于 {time}</span>
          </div>
        </div>
      ) : (
        //未折叠的
        <div className="notice-message-body-unfold">
          <div className="notice-message-header">{title}</div>
          <div className="notice-message-contents">{content}</div>
          <div className="notice-message-footer">
            <div className="notice-message-footer-post">
              由 校大学生科协 发布于 {time}
              {role === 0 ? (
                <></>
              ) : (
                <div className="notice-message-footer-button">
                  <Button type="primary">编辑</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Notice
