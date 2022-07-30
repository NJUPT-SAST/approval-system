import { DashboardOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect } from 'react'
import { atom, useRecoilValue, useSetRecoilState } from 'recoil'

const state_str = window.localStorage.getItem('inboxPoint') ?? 'off'
export const userPointState = atom({
  key: 'userPointState',
  default: { point: state_str },
})

function AdminMenu(props: any) {
  const point = useRecoilValue(userPointState)
  const setuserPointState = useSetRecoilState(userPointState)
  useEffect(() => {
    return () => {
      if (!point) setuserPointState({ point: 'off' })
      console.log(point)
    }
  }, [])

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
        收件箱{point.point === 'on' ? <></> : <span className="message-read-or-not"></span>}
      </Menu.Item>
      <Menu.Item key="/activity" icon={<DashboardOutlined />}>
        活动广场
      </Menu.Item>
      <Menu.Item key="/manage" icon={<DashboardOutlined />}>
        活动管理
      </Menu.Item>
    </Menu>
  )
}

export default AdminMenu
