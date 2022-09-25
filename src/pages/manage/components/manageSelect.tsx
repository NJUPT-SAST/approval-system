import { Dropdown, Space, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
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
    navigate('../activity/' + competitionId + '/manage/', {
      state: { competitionId: competitionId, competitionName: competitionName },
    })
  }
  const toEditWhiteList = () => {
    navigate('../activity/' + competitionId + '/manage/edit/whiteList', {
      state: { competitionId: competitionId, competitionName: competitionName },
    })
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div
              style={{ color: 'rgba(42, 130, 228, 1)' }}
              onClick={() => {
                toEditCompetition()
              }}
            >
              活动
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div style={{ color: 'rgba(42, 130, 228, 1)' }} onClick={toEditWhiteList}>
              白名单
            </div>
          ),
        },
      ]}
    />
  )
  return (
    <>
      <Dropdown overlay={menu}>
        <div style={{ width: '6.4%', color: 'rgba(42, 130, 228, 1)', cursor: 'pointer' }}>
          <Space>
            管理
            <DownOutlined />
          </Space>
        </div>
      </Dropdown>
      {/* <Button
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
      </Button> */}
    </>
  )
}

export default ManangeSelect
