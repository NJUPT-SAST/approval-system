import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import TopBar from '../../components/TopBar'
import { message } from '../../test/inbox-message'
import InboxMessage from './components/inboxMessage'
import { userInboxPointState } from '../../store/userInboxState'
import { useSetRecoilState } from 'recoil'
import './index.scss'

const maxNumber = 1
export const MessageContext = React.createContext(message)
export const AllFoldContext = React.createContext({ fold: true, unfold: false })
const Inbox: React.FC = () => {
  const messageStateStorage = window.localStorage
  //用来存储状态的 依赖项应为信息最大数目？
  const setuserPointState = useSetRecoilState(userInboxPointState)
  useEffect(() => {
    if (messageStateStorage.getItem('allReadState') === null) {
      messageStateStorage.setItem(
        'allReadState',
        JSON.stringify({ allRead: false, haveReadNumber: 0, maxNumber: maxNumber }),
      ) //maxNumber 由请求返回 其余自定
    }
    if (messageStateStorage.getItem('allFoldState') === null) {
      messageStateStorage.setItem(
        'allFoldState',
        JSON.stringify({ allFold: true, haveFoldNumber: maxNumber, maxNumber: maxNumber }),
      )
    }
  }, [])
  //用来管理向子串传值的
  useEffect(() => {
    if (messageStateStorage.getItem('everyInboxMessageState') === null) {
      const a = new Array<{ fold: boolean; read: boolean }>(maxNumber)
      for (let i = 0; i < maxNumber; i++) {
        a[i] = { fold: true, read: false }
      }
    }
    //填充
    else {
      let a = new Array<{ fold: boolean; read: boolean }>(maxNumber)
      const b_str = messageStateStorage.getItem('everyInboxMessageState') ?? JSON.stringify(a)
      const b = JSON.parse(b_str)
      a = [...a, ...b]
      for (let i = 0; i < maxNumber; i++) {
        if (a[i] === null) a[i] = { fold: true, read: false }
      }
    }
  }, [])
  //临时存储
  const readState_str: string =
    messageStateStorage.getItem('allReadState') ??
    JSON.stringify({ allRead: false, haveReadNumber: 0, maxNumber: maxNumber })
  const foldState_str: string =
    messageStateStorage.getItem('allFoldState') ??
    JSON.stringify({ allFold: true, haveFoldNumber: maxNumber, maxNumber: maxNumber })
  const childState_str: string =
    messageStateStorage.getItem('everyInboxMessageState') ??
    (() => {
      const a = new Array<{ fold: boolean; read: boolean }>(maxNumber)
      for (let i = 0; i < maxNumber; i++) {
        a[i] = { fold: true, read: false }
      }
      return JSON.stringify(a)
    })()
  const childMessageState: { read: boolean; fold: boolean }[] = JSON.parse(childState_str)
  const [childState, setChildState] = useState<{ read: boolean; fold: boolean }[]>(childMessageState)
  const messageReadState = JSON.parse(readState_str)
  const messageFoldState = JSON.parse(foldState_str)
  const [allFoldState, setAllFoldState] = useState({
    allFold: messageFoldState.allFold,
    haveFoldNumber: messageFoldState.haveFoldNumber,
    maxNumber: messageReadState.maxNumber,
  })
  const [allReadState, setAllReadState] = useState({
    allRead: messageReadState.allRead,
    haveReadNumber: messageReadState.haveReadNumber,
    maxNumber: messageReadState.maxNumber,
  })
  //控制 inbox
  const controlAllReadState = (messageState: boolean): void => {
    //若点击事件的信息组件当前为已读 那么切换至未读状态 已读数目减少 若在此之前数目为数目为最大数目，则设置全部已读为false，并且同步至localStorage
    if (messageState) {
      //===true
      setAllReadState((preState) => {
        const a = { ...preState }
        if (a.haveReadNumber === maxNumber) {
          a.allRead = false
          //红点出现
          messageStateStorage.setItem('inboxPoint', 'on')
          messageStateStorage.setItem('allRead', 'false')
          setuserPointState({ point: 'on' })
        }
        a.haveReadNumber--
        messageStateStorage.setItem('allReadState', JSON.stringify(a))
        return a
      })
    }
    //否则切换至已读状态 已读数目增加 若此时数目为最大数目 则设置全部已读为true
    else {
      setAllReadState((preState) => {
        const a = { ...preState }
        a.haveReadNumber++
        if (a.haveReadNumber === maxNumber) {
          a.allRead = true
          messageStateStorage.setItem('inboxPoint', 'off')
          messageStateStorage.setItem('allRead', 'true')
          setuserPointState({ point: 'off' })
        }
        messageStateStorage.setItem('allReadState', JSON.stringify(a))
        return a
      })
    }
  }

  const controlAllFoldState = (messageState: boolean) => {
    //发生点击事件时状态为fold 那么展开 折叠数目减一 如果展开前数目为最大数目 则切换全部折叠 状态为 false
    if (messageState) {
      //===true
      setAllFoldState((preState) => {
        const a = { ...preState }
        if (a.haveFoldNumber === maxNumber) {
          a.allFold = false
        }
        a.haveFoldNumber--
        messageStateStorage.setItem('allFoldState', JSON.stringify(a))
        return a
      })
    }
    //点击时为展开
    else {
      setAllFoldState((preState) => {
        const a = { ...preState }
        a.haveFoldNumber++
        if (a.haveFoldNumber === maxNumber) {
          a.allFold = true
        }
        messageStateStorage.setItem('allFoldState', JSON.stringify(a))
        return a
      })
    }
  }

  const controlChildState = (localIndex: number, newReadState: boolean, newFoldState: boolean): void => {
    setChildState((preState) => {
      const a = [...preState]
      a[localIndex].read = newReadState
      a[localIndex].fold = newFoldState
      messageStateStorage.setItem('everyInboxMessageState', JSON.stringify(a))
      return a
    })
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
                setAllReadState((preState) => {
                  const a = { ...preState }
                  a.allRead = true
                  a.haveReadNumber = a.maxNumber
                  messageStateStorage.setItem('allReadState', JSON.stringify(a))
                  messageStateStorage.setItem('inboxPoint', 'off')
                  return a
                })
                setuserPointState({ point: 'off' })
                setChildState((preState) => {
                  const a = [...preState]

                  a.map((value) => {
                    value.read = true
                    return 0
                  })

                  messageStateStorage.setItem('everyInboxMessageState', JSON.stringify(a))
                  return a
                })
              }}
            >
              全部已读
            </Button>
            <Button
              type="primary"
              className="inbox-message-control-button"
              onClick={() => {
                setAllFoldState((preState) => {
                  const a = { ...preState }
                  a.allFold = true
                  a.haveFoldNumber = a.maxNumber
                  messageStateStorage.setItem('allFoldState', JSON.stringify(a))
                  return a
                })
                setChildState((preState) => {
                  const a = [...preState]
                  a.map((value) => {
                    value.fold = true
                    return 0
                  })
                  messageStateStorage.setItem('everyInboxMessageState', JSON.stringify(a))
                  return a
                })
              }}
            >
              全部收起
            </Button>
            <Button
              type="primary"
              className="inbox-message-control-button"
              onClick={() => {
                setAllFoldState((preState) => {
                  const a = { ...preState }
                  a.allFold = false
                  a.haveFoldNumber = 0
                  messageStateStorage.setItem('allFoldState', JSON.stringify(a))
                  return a
                })
                setChildState((preState) => {
                  const a = [...preState]
                  a.map((value) => {
                    value.fold = false
                    return 0
                  })
                  messageStateStorage.setItem('everyInboxMessageState', JSON.stringify(a))
                  return a
                })
              }}
            >
              全部展开
            </Button>
          </div>
        </div>
        <InboxMessage
          localIndex={0} //倒续
          index={0}
          key={'WelcomMessage'}
          foldState={childState[0].fold}
          readState={childState[0].read}
          allChildState={childState}
          controlChildState={controlChildState}
          controlAllFoldState={controlAllFoldState}
          controlAllReadState={controlAllReadState}
        />
      </div>
    </>
  )
}

export default Inbox
