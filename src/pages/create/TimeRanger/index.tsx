import { DatePicker, DatePickerProps } from 'antd'
import { competitionInfoType } from '../../../type/apiTypes'
import moment from 'moment'
import React from 'react'
import './index.scss'
import locale from 'antd/es/date-picker/locale/zh_CN'

type propsType = {
  operation: string
  setStartTime: (time: string, operation: string) => void
  preStartTime: string
  preEndTime: string
  setEndTime: (time: string, operation: string) => void
}

const name: Record<string, string> = { signUp: '报名', submit: '提交', review: '评审' }

const TimeRanger: React.FC<propsType> = (props) => {
  const { operation, setStartTime, preStartTime, preEndTime, setEndTime } = props
  const dataFormat = 'YYYY-MM-DD HH:mm:ss'
  const onStartTimeOk = (value: DatePickerProps['value']) => {
    setStartTime(value!.format(dataFormat), operation)
  }
  const onEndTimeOk = (value: DatePickerProps['value']) => {
    setEndTime(value!.format(dataFormat), operation)
  }

  return (
    <div className="activity-create-times">
      <div className="activity-create-times-start">
        <span id="activity-create-times-start">{`${name[operation]}开始时间`}</span>
        {preStartTime === '' ? (
          <DatePicker showTime onOk={onStartTimeOk} showNow={false} placeholder="选择时间" locale={locale} />
        ) : (
          <DatePicker
            showTime
            defaultValue={moment(preStartTime, dataFormat)}
            onOk={onStartTimeOk}
            showNow={false}
            placeholder="选择时间"
            locale={locale}
          />
        )}
      </div>
      <div className="activity-create-times-end">
        <span id="activity-create-times-end">{`${name[operation]}截止时间`}</span>
        {preEndTime === '' ? (
          <DatePicker showTime onOk={onEndTimeOk} showNow={false} placeholder="选择时间" locale={locale} />
        ) : (
          <DatePicker
            showTime
            defaultValue={moment(preEndTime, dataFormat)}
            onOk={onEndTimeOk}
            showNow={false}
            placeholder="选择时间"
            locale={locale}
          />
        )}
      </div>
    </div>
  )
}

export default TimeRanger
