import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
function JudgeMenu(props: any) {
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
      <Menu.Item key="/inbox" icon={<DashboardOutlined />}>
        收件箱
      </Menu.Item>
      <Menu.Item key="/review" icon={<DashboardOutlined />}>
        活动评审
      </Menu.Item>
    </Menu>
  )
}

export default JudgeMenu
