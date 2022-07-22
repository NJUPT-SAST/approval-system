import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'

function JudgeMenu(props: any) {
  // const Storage = localStorage
  // const readState_str =
  //   Storage.getItem('allReadState') ?? JSON.stringify({ allRead: false, haveReadNumber: 0, maxNumber: 8 })
  // const readState = JSON.parse(readState_str)
  // const [allRead, setAllRead] = useState(false)
  // useEffect(() => {
  //   if (Storage.getItem('allReadState') === null) {
  //     Storage.setItem('allReadState', JSON.stringify({ allRead: false, haveReadNumber: 0, maxNumber: 8 }))
  //   } else {
  //     const a_str =
  //       Storage.getItem('allReadState') ?? JSON.stringify({ allRead: false, haveReadNumber: 0, maxNumber: 8 })
  //     const a = JSON.parse(a_str)
  //     setAllRead(a.allRead)
  //   }
  // },[])
  const allRead = true
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
        收件箱{allRead ? <></> : <span className="message-read-or-not"></span>}
      </Menu.Item>
      <Menu.Item key="/review" icon={<DashboardOutlined />}>
        活动评审
      </Menu.Item>
    </Menu>
  )
}
export default JudgeMenu
