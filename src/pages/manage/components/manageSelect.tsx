import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type propsType = {
  competitionId: number
  competitionName: string
}
const ManangeSelect: React.FC<propsType> = (props) => {
  const { competitionId, competitionName } = props
  const navigate = useNavigate()
  const toEditCompetition = () => {
    navigate('../activity/' + competitionId + '/manage', {
      state: { competitionId: competitionId, competitionName: competitionName },
    })
  }
  const toEditWhiteList = () => {
    navigate('../activity/' + competitionId + '/manage', {
      state: { competitionId: competitionId, competitionName: competitionName },
    })
  }
  return (
    <>
      <Button
        style={{
          display: 'block',
          width: '70px',
          margin: '0 0 5px 0',
          color: 'rgba(42, 130, 228, 1)',
          cursor: 'pointer',
        }}
        onClick={toEditCompetition}
      >
        活动
      </Button>
      <Button
        style={{ display: 'block', width: '70px', color: 'rgba(42, 130, 228, 1)', cursor: 'pointer' }}
        onClick={toEditWhiteList}
      >
        白名单
      </Button>
    </>
  )
}

export default ManangeSelect
