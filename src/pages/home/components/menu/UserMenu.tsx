import { DashboardOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { userInboxPointState } from '../../../../store/userInboxState'
import { Menu } from 'antd'
import React from 'react'

function UserMenu(props: any) {
  const { point } = useRecoilValue(userInboxPointState)
  return (
    <Menu
      mode="inline"
      onClick={props.handleClickMenuItem}
      selectedKeys={[props.navigation]}
      defaultSelectedKeys={['/']}
    >
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        我的账号
      </Menu.Item>
      <Menu.Item key="/inbox" icon={<DashboardOutlined />}>
        收件箱{point === 'on' ? <></> : <span className="message-read-or-not"></span>}
      </Menu.Item>
      <Menu.Item key="/activity" icon={<DashboardOutlined />}>
        活动广场
      </Menu.Item>
    </Menu>
  )
}

export default UserMenu
