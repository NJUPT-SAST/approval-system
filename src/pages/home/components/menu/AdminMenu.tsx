import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

function AdminMenu(props: any) {
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
      <Menu.Item key="/news" icon={<DashboardOutlined />}>
        新闻管理
      </Menu.Item>
      <Menu.Item key="/activity" icon={<DashboardOutlined />}>
        活动管理
      </Menu.Item>
      <Menu.Item key="/review" icon={<DashboardOutlined />}>
        评分管理
      </Menu.Item>
    </Menu>
  )
}

export default AdminMenu
