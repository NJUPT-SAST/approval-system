import React from 'react'
import './index.scss'

type propsType = {
  name: string
  num: number
}

const name: { [key: string]: string } = { regist: '报名', submit: '提交材料', approve: '评审' }
const StatisticsBox: React.FC<propsType> = (props) => {
  return (
    <div id={`statisticsbox-${props.name}`}>
      <div id={`statisticsbox-rect-${props.name}`}></div>
      <div className="statisticsbox-des">
        <span id="statisticsbox-des-name">{`已${name[props.name]}数`}</span>
        <span id="statisticsbox-des-num">{props.num}</span>
      </div>
    </div>
  )
}

export default StatisticsBox
