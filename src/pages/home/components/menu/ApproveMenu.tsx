import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'

function ApproveMenu(props: any) {
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
      <Menu.Item key="/approve" icon={<DashboardOutlined />}>
        审批中心
      </Menu.Item>
    </Menu>
  )
}

export default ApproveMenu
