import React from 'react'
import './index.scss'
import { Result } from 'antd'

function ResultPage() {
  return (
    <div className="result-body">
      <div className="result-box">
        <Result status="success" title="比赛报名成功" subTitle="祝你比赛顺利" />
      </div>
    </div>
  )
}

export default ResultPage
