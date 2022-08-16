import { Button } from 'antd'
import React, { useState } from 'react'

type propsType = {
  index: number
  readState: boolean
  controlReadState: () => void
}

const InboxReadStateControlButton: React.FC<propsType> = (props) => {
  const [loadingState, setLoadingState] = useState<boolean>()
  const changeState = () => {
    setLoadingState((preState) => {
      const newState = true
      return newState
    })
    setTimeout(() => {
      setLoadingState((preState) => {
        const newState = false
        return newState
      })
    }, 500)
    props.controlReadState()
  }
  return (
    <Button type={props.readState ? 'ghost' : 'primary'} loading={loadingState} onClick={changeState}>
      {props.readState ? '取消已读' : '已读'}
    </Button>
  )
}
export default InboxReadStateControlButton
