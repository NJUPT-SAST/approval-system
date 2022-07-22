import { Button } from 'antd'
import React, { useState } from 'react'
import TopBar from '../../components/TopBar'
import { message, messageType } from '../../test/inbox-message'
import Message from './components/message'
import './index.scss'

export const MessageContext = React.createContext(message)
export const AllFoldContext = React.createContext({ fold: false, unfold: false })
const Inbox: React.FC = () => {
  const [foldState, setFoldState] = useState({ fold: true, unfold: false })
  const [allReadState, setAllReadState] = useState(false)
  const controlAllReadState = (newAllReadState: boolean): void => {
    setAllReadState(newAllReadState)
  }
  return (
    <>
      <TopBar />
      <div className="inbox-content">
        <div className="inbox-button-nav">
          <div className="inbox-button">
            <Button
              type="primary"
              className="inbox-message-control-button"
              onClick={() => {
                setAllReadState(true)
              }}
            >
              全部已读
            </Button>
            <Button
              type="primary"
              className="inbox-message-control-button"
              onClick={() => setFoldState({ fold: true, unfold: false })}
            >
              全部收起
            </Button>
            <Button
              type="primary"
              className="inbox-message-control-button"
              onClick={() => setFoldState({ fold: false, unfold: true })}
            >
              全部展开
            </Button>
          </div>
        </div>
        <MessageContext.Provider value={message}>
          <AllFoldContext.Provider value={foldState}>
            {message.map((value, index) => (
              <Message
                index={index}
                key={value.id}
                allHaveRead={allReadState}
                controlAllReadState={controlAllReadState}
              />
            ))}
          </AllFoldContext.Provider>
        </MessageContext.Provider>
      </div>
    </>
  )
}

export default Inbox

export function reducer(messageState: { message: messageType[] }, action: actionType) {
  switch (action.type) {
    case 'messageAllRead': {
      return { ...messageState }
    }
    case 'messageAllUnfold': {
      return messageState
    }
    case 'messageAllFold': {
      return messageState
    }
    default: {
      throw new Error()
    }
  }
}

type actionType = {
  type: string
  payload: messageType[]
}
