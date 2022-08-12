import { ExportOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import userStateStore from '../../store/userState'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'
import menuMap from './components/menu'
import './index.scss'
import { login } from '../../api/public'

const { Header, Content, Sider } = Layout
//on表示无红点 off与其他表示有红点 位置待调整
const state_str = window.localStorage.getItem('inboxPoint') ?? 'off'
export const userInboxPointState = atom({
  key: 'userPointState',
  default: { point: state_str },
})

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [navigation, setNavigation] = useState('/')
  // const [collapsed, setCollapsed] = useState(false)
  const [userState, setUserState] = useRecoilState(userStateStore)
  const [validateCodeId, setValidateCodeId] = useState('')
  const setUserInboxPointState = useSetRecoilState(userInboxPointState)
  const Menu = menuMap.get(userState)
  useEffect(() => {
    const match = location?.pathname
    const matchArray = match.split('/')
    match ? setNavigation('/' + matchArray[1]) : setNavigation('')
  }, [location])

  const handleClickMenuItem = (e: { key: string }) => {
    navigate(e.key)
    setNavigation(e.key)
  }
  //点击登录时将会执行下面的 onFinish函数
  const onFinish = (values: any) => {
    // console.log('Received values of form: ', values)
    login(validateCodeId, values.validate, values.username).then((res) => {
      // console.log(res)
      localStorage.setItem('token', res.data.data.token)
      switch (res.data.data.role) {
        case 3:
          setUserState('admin')
          localStorage.setItem('userState', 'admin')
          break
        case 2:
          setUserState('approver')
          localStorage.setItem('userState', 'admin')
          break
        case 0:
          setUserState('user')
          localStorage.setItem('userState', 'user')
          break
        case 1:
          setUserState('judge')
          localStorage.setItem('userState', 'admin')
          break
        default:
          break
      }
    })
  }
  //退出登录时将会执行这里的 logout 函数
  const logout = () => {
    setUserState('offline')
    localStorage.clear()
    localStorage.setItem('userState', 'offline')
    localStorage.removeItem('inboxPoint')
    localStorage.removeItem('allReadState')
    localStorage.removeItem('allFoldState')
    localStorage.removeItem('everyInboxMessageState')
    setUserInboxPointState({ point: 'off' })
    setNavigation('/')
    navigate('/')
  }

  const getValidateId = (validateId: string) => {
    setValidateCodeId(validateId)
  }
  // console.log(validateCodeId)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="header-wrap">
          <div className="logo-wrap">
            <div className="logo"></div>
            <h1 className="logo-name">通用比赛管理评审系统</h1>
          </div>
          <div className="control-wrap">
            <div className="control-item">
              <QuestionCircleOutlined></QuestionCircleOutlined>
            </div>
            <div className="control-item">
              <SearchOutlined></SearchOutlined>
            </div>
            <div className="control-item">
              <BellOutlined></BellOutlined>
            </div>

            <div className="user-wrap">
              <div className="user-img"></div>
              <div className="username">Teacher Gu</div>
            </div>
            <div className="control-item" onClick={logout}>
              <ExportOutlined
                style={{
                  fontSize: '24px',
                }}
              ></ExportOutlined>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          // collapsible
          // collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
          width={200}
          className="site-layout-background sidebar"
        >
          {userState === 'offline' ? (
            <LoginForm finishCb={onFinish} setCodeId={getValidateId}></LoginForm>
          ) : (
            <p>已经登陆</p>
          )}
          <Menu handleClickMenuItem={handleClickMenuItem} navigation={navigation}></Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              borderLeft: '1px solid rgba(0,0,0,0.1)',
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Home
