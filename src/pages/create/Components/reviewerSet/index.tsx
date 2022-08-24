import React from 'react'
import { Input } from 'antd'
import { Value } from 'sass'

type reviewSetPropsType = {
  value: { [key: string]: string }
  index: number
  setKey: (index: number, key: string) => void
  setValue: (index: number, value: string) => void
}

const ReviewSet: React.FC<reviewSetPropsType> = (props) => {
  const { value, index, setKey, setValue } = props
  return (
    <div className="activity-create-reviewer-setting">
      <span className="activity-create-reviewer-code">审批者学号</span>
      <Input
        className="first"
        placeholder="审批者学号"
        onChange={(e) => {
          setKey(index, e.target.value)
        }}
        showCount={false}
      />
      <span className="activity-create-reviewer-faculty">审批学院</span>
      <Input
        className="last"
        placeholder="负责的审批的学院"
        showCount={false}
        onChange={(e) => {
          setValue(index, e.target.value)
        }}
      />
    </div>
  )
}

export default ReviewSet
