import { Button } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { AllFoldContext, MessageContext } from '../..'
import { messageType } from '../../../../test/inbox-message'
import './message.scss'

const Message: React.FC<{ index: number }> = (iNdex: { index: number }) => {
  const { index } = iNdex
  const inboxMessage = useContext(MessageContext)[index]

  const allFold = useContext(AllFoldContext)
  const [haveRead, setHaveRead] = useState(inboxMessage.haveRead)
  const [isfold, setIsfold] = useState(inboxMessage.isfold)
  useEffect(() => setIsfold(allFold.fold), [allFold])
  return (
    <>
      <div className={isfold ? 'inbox-message-nav-unfold' : 'inbox-message-nav-unfold'}>
        <Button
          type="primary"
          className="inbox-message-display-switch-button"
          onClick={() => {
            setIsfold(isfold ? false : true)
          }}
        >
          {' '}
        </Button>
      </div>
      {isfold ? ( //折叠后的
        <div className="inbox-message-body-fold">
          <div className="inbox-message-header">
            {inboxMessage.title}
            {haveRead ? <></> : <span className="message-read-or-not"></span>}
            <span className="inbox-message-footer-post">
              由 {inboxMessage.post} 发布于 {inboxMessage.time}
            </span>
          </div>
        </div>
      ) : (
        //未折叠的
        <div className="inbox-message-body-unfold">
          <div className="inbox-message-header">
            {inboxMessage.title}
            {haveRead ? <></> : <span className="message-read-or-not"></span>}
          </div>
          <div className="inbox-message-contents">{inboxMessage.content}</div>
          <div className="inbox-message-footer">
            <div className="inbox-message-footer-post">
              由 {inboxMessage.post} 发布于 {inboxMessage.time}
              <div className="inbox-message-footer-button">
                <Button type="primary" onClick={() => setHaveRead(true)}>
                  已读
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Message
