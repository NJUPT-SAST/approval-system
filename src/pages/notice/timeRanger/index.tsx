import React from 'react'
import { DatePicker, DatePickerProps } from 'antd'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN'

type noticePropsType = {
  setTime: (time: string) => void
  preTime: string
}

const TimeRanger: React.FC<noticePropsType> = (props) => {
  const { setTime, preTime } = props
  const dataFormat = 'YYYY-MM-DD HH:mm'
  const onTimeOk = (value: DatePickerProps['value']) => {
    setTime(value!.format(dataFormat))
  }
  return preTime === '' ? (
    <div>
      <DatePicker
        showTime
        showNow={false}
        placeholder="公告发布时间"
        locale={locale}
        format={dataFormat}
        onOk={onTimeOk}
      />
    </div>
  ) : (
    <div>
      <DatePicker
        showTime
        value={moment(preTime, dataFormat)}
        showNow={false}
        placeholder="公告发布时间"
        locale={locale}
        format={dataFormat}
        onOk={onTimeOk}
      />
    </div>
  )
}

export default TimeRanger
