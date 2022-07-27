import { DatePicker, DatePickerProps } from 'antd'
import React from 'react'
import './index.scss'
import locale from 'antd/es/date-picker/locale/zh_CN'

type propsType = {
  operation: string
  setStartTime: (time: string) => void
  setEndTime: (time: string) => void
}

const name: Record<string, string> = { signUp: '报名', submit: '提交', review: '评审' }

const TimeRanger: React.FC<propsType> = (props) => {
  const { operation, setStartTime, setEndTime } = props

  const onStartTimeOk = (value: DatePickerProps['value']) => {
    setStartTime(value!.format('YYYY-MM-DD HH:mm:ss'))
  }

  const onEndTimeOk = (value: DatePickerProps['value']) => {
    setEndTime(value!.format('YYYY-MM-DD HH:mm:ss'))
  }

  return (
    <div className="activity-create-times">
      <div className="activity-create-times-start">
        <span id="activity-create-times-start">{`${name[operation]}开始时间`}</span>
        <DatePicker showTime onOk={onStartTimeOk} showNow={false} placeholder="选择时间" locale={locale} />
      </div>
      <div className="activity-create-times-end">
        <span id="activity-create-times-end">{`${name[operation]}截止时间`}</span>
        <DatePicker showTime onOk={onEndTimeOk} showNow={false} placeholder="选择时间" locale={locale} />
      </div>
    </div>
  )
}

export default TimeRanger
