import { Divider, Steps } from 'antd'
import React, { useState } from 'react'

const ManageSteps = () => {
  const { Step } = Steps
  const [current, setCurrent] = useState(0)
  return (
    <>
      <Steps current={current} direction="vertical">
        <Step title="步骤 1" description="请设置比赛信息" />
        <Step title="步骤 2" description="请选择是否添加白名单" />
      </Steps>
    </>
  )
}

export default ManageSteps
