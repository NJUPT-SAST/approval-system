import React from 'react'
import { Menu } from 'antd'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
function UnLoginMenu(props: any) {
  return (
    <Menu
      mode="inline"
      onClick={props.handleClickMenuItem}
      selectedKeys={[props.navigation]}
      defaultSelectedKeys={['/']}
    >
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        活动广场
      </Menu.Item>
      <Menu.Item key="/account" icon={<UserOutlined />}>
        我的账号
      </Menu.Item>
    </Menu>
  )
}

export default UnLoginMenu
