import { Button } from 'antd'
import React, { useState, useContext, useEffect } from 'react'
import { AllFoldContext, MessageContext } from '..'
import { messageType } from '../../../test/inbox-message'
import InboxReadStateControlButton from './inboxReadStateControlButton'

type propsType = {
  index: number
  allHaveRead: boolean
  controlAllReadState: (newAllReadState: boolean) => void
}

const Message: React.FC<propsType> = (props) => {
  const { index } = props
  const inboxMessage = useContext(MessageContext)[index]
  const allFold = useContext(AllFoldContext)
  const [haveRead, setHaveRead] = useState(inboxMessage.haveRead)
  const [isfold, setIsfold] = useState(inboxMessage.isfold)
  useEffect(() => setIsfold(allFold.fold), [allFold])
  useEffect(() => {
    if (!haveRead) props.controlAllReadState(false)
  })
  useEffect(() => {
    setHaveRead((preState) => {
      if (preState) {
        return preState
      } else return props.allHaveRead
    })
  }, [props.allHaveRead])
  useEffect(() => {
    setHaveRead(inboxMessage.haveRead)
  }, [inboxMessage.haveRead])
  const controlReadState = (nowhaveRead: boolean): void => {
    setHaveRead(nowhaveRead)
  }

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
                <InboxReadStateControlButton
                  index={index}
                  readState={haveRead}
                  controlReadState={controlReadState}
                  controlAllHaveReadState={props.controlAllReadState}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Message
