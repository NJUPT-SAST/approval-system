import { Button } from 'antd'
import React from 'react'
import { inboxMessageType } from '../../../../test/inbox-message'
import './message.scss'

const Message: React.FC<inboxMessageType> = (inboxMessage: inboxMessageType) => {
  return (
    <>
      <div className={inboxMessage.isfold ? 'inbox-message-nav-unfold' : 'inbox-message-nav-unfold'}>
        <Button type="primary" className="inbox-message-display-switch-button">
          {' '}
        </Button>
      </div>
      {inboxMessage.isfold ? ( //折叠后的
        <div className="inbox-message-body-fold">
          <div className="inbox-message-header">
            {inboxMessage.message.title}
            <span className="inbox-message-footer-post">
              由 {inboxMessage.message.post} 发布于 {inboxMessage.message.time}
            </span>
          </div>
        </div>
      ) : (
        //未折叠的
        <div className="inbox-message-body-unfold">
          <div className="inbox-message-header">{inboxMessage.message.title}</div>
          <div className="inbox-message-contents">{inboxMessage.message.content}</div>
          <div className="inbox-message-footer">
            <div className="inbox-message-footer-post">
              由 {inboxMessage.message.post} 发布于 {inboxMessage.message.time}
              <div className="inbox-message-footer-button">
                <Button type="primary">已读</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Message
