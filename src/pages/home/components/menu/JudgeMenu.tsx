import { DashboardOutlined, MessageOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons'
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
      <Menu.Item key="/inbox" icon={<MessageOutlined />}>
        收件箱{point === 'on' ? <span className="message-read-or-not"></span> : <></>}
      </Menu.Item>
      <Menu.Item key="/activity" icon={<SendOutlined />}>
        比赛入口
      </Menu.Item>
      <Menu.Item key="/review" icon={<SettingOutlined />}>
        比赛审核
      </Menu.Item>
    </Menu>
  )
}

export default JudgeMenu
