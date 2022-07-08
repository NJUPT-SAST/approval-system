import React from 'react'
import { Menu } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'
function UnLoginMenu(props: any) {
  return (
    <Menu
      mode="inline"
      onClick={props.handleClickMenuItem}
      selectedKeys={[props.navigation]}
      defaultSelectedKeys={['/activity']}
    >
      <Menu.Item key="/activity" icon={<DashboardOutlined />}>
        活动广场
      </Menu.Item>
    </Menu>
  )
}

export default UnLoginMenu
