import { DashboardOutlined, ImportOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { userInboxPointState } from '../../../../store/userInboxState'
import { Menu } from 'antd'
import React from 'react'
function JudgeMenu(props: any) {
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
        收件箱{point === 'on' ? <span className="message-read-or-not"></span> : <></>}
      </Menu.Item>
      <Menu.Item key="/activity" icon={<DashboardOutlined />}>
        活动广场
      </Menu.Item>
      <Menu.Item key="/review" icon={<DashboardOutlined />}>
        活动评审
      </Menu.Item>
      <Menu.Item key="/import" icon={<ImportOutlined />}>
        一键导入
      </Menu.Item>
    </Menu>
  )
}

export default JudgeMenu
