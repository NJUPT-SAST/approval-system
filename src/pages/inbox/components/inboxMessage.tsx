import { Button } from 'antd'
import React, { useContext } from 'react'
import { MessageContext } from '..'
import InboxReadStateControlButton from './inboxReadStateControlButton'
import { inboxMessagePropsType } from '../../../type/inboxType'

const InboxMessage: React.FC<inboxMessagePropsType> = (props) => {
  const { index, localIndex, readState, foldState, controlAllReadState, controlAllFoldState, controlChildState } = props
  const inboxMessage = useContext(MessageContext)[index]
  const controlReadState = () => {
    controlAllReadState(readState)
    controlChildState(localIndex, !readState, foldState)
  }
  return (
    <>
      <div className={foldState ? 'inbox-message-nav-unfold' : 'inbox-message-nav-unfold'}>
        <Button
          type="primary"
          className="inbox-message-display-switch-button"
          onClick={() => {
            controlAllFoldState(foldState)
            controlChildState(localIndex, readState, !foldState)
          }}
        >
          {' '}
        </Button>
      </div>
      {foldState ? ( //折叠后的
        <div className="inbox-message-body-fold">
          <div className="inbox-message-header">
            {inboxMessage.title}
            {readState ? <></> : <span className="message-read-or-not"></span>}
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
            {readState ? <></> : <span className="message-read-or-not"></span>}
          </div>
          <div className="inbox-message-contents">{inboxMessage.content}</div>
          <div className="inbox-message-footer">
            <div className="inbox-message-footer-post">
              由 {inboxMessage.post} 发布于 {inboxMessage.time}
              <div className="inbox-message-footer-button">
                <InboxReadStateControlButton index={index} readState={readState} controlReadState={controlReadState} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default InboxMessage
