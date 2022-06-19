import React from 'react'
import { Menu } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'
function UnLoginMenu() {
  return (
    <Menu mode="inline" defaultSelectedKeys={['/firstPage']}>
      <Menu.Item key="/firstPage" icon={<DashboardOutlined />}>
        首页
      </Menu.Item>
    </Menu>
  )
}

export default UnLoginMenu
