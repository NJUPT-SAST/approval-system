import React from 'react'
import { Menu } from 'antd'
import { DashboardOutlined, SendOutlined } from '@ant-design/icons'
function UnLoginMenu(props: any) {
  return (
    <Menu
      mode="inline"
      onClick={props.handleClickMenuItem}
      selectedKeys={[props.navigation]}
      defaultSelectedKeys={['/']}
    >
      <Menu.Item key="/" icon={<SendOutlined />}>
        比赛入口
      </Menu.Item>
    </Menu>
  )
}

export default UnLoginMenu
