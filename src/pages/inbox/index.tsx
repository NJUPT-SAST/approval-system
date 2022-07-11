import { Button } from 'antd'
import React, { useReducer } from 'react'
import TopBar from '../../components/TopBar'
import message, { messageType, inboxMessageType } from '../../test/inbox-message'
import Message from './components/message/message'
import './index.scss'

const Inbox: React.FC = () => {
  return (
    <div>
      <TopBar />
      <div className="inbox-button-nav">
        <div className="inbox-button">
          <Button type="primary" className="inbox-message-control-button">
            全部已读
          </Button>
          <Button type="primary" className="inbox-message-control-button">
            全部收起
          </Button>
          <Button type="primary" className="inbox-message-control-button">
            全部展开
          </Button>
        </div>
      </div>
      <Message {...{ message: message[0], isfold: false }} />
      <Message {...{ message: message[1], isfold: false }} />
      <Message {...{ message: message[2], isfold: true }} />
      <Message {...{ message: message[3], isfold: true }} />
      <Message {...{ message: message[4], isfold: true }} />
      <Message {...{ message: message[5], isfold: true }} />
      <Message {...{ message: message[6], isfold: true }} />
      <Message {...{ message: message[7], isfold: true }} />
    </div>
  )
}

export default Inbox
