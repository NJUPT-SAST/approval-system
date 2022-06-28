import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

function UserMenu(props: any) {
  return (
    <Menu
      mode="inline"
      onClick={props.handleClickMenuItem}
      selectedKeys={[props.navigation]}
      defaultSelectedKeys={['/']}
    >
      <Menu.Item key="/" icon={<DashboardOutlined />}>
        首页
      </Menu.Item>
      <Menu.Item key="/team" icon={<DashboardOutlined />}>
        团队管理
      </Menu.Item>
      <Menu.Item key="/apply" icon={<DashboardOutlined />}>
        报名中心
      </Menu.Item>
    </Menu>
  )
}

export default UserMenu
