import { ExportOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, notification } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import UserProfile from './components/userProfile'
import userStateStore from '../../store/userState'
import userProfileStore from '../../store/userProfile'
import { useRecoilState } from 'recoil'
import menuMap from './components/menu'
import './index.scss'
import { login } from '../../api/public'
import { getUserProfile } from '../../api/user'
import LogoSvg from "../../assets/Logo.svg"

const { Header, Content, Sider } = Layout

const Home = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [navigation, setNavigation] = useState('/')
  //给loginForm组件用于刷新验证码
  const [getValidateCode, setGetValidateCode] = useState(1)
  // const [collapsed, setCollapsed] = useState(false)
  const [userState, setUserState] = useRecoilState(userStateStore)
  const [userProfile, setUserProfile] = useRecoilState(userProfileStore)
  const [validateCodeId, setValidateCodeId] = useState('')

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
    console.log('Received values of form: ', values)
    login(validateCodeId, values.validate, values.username, values.password).then((res) => {
      // console.log(res)
      if (res.data.success) {
        localStorage.setItem('approval-system-token', res.data.data.token)
        getUserProfile().then((res) => {
          if (res.data.success) {
            setUserProfile((pre) => {
              const a = { ...pre }
              a.code = res.data.data.code
              localStorage.setItem('approval-system-code', res.data.data.code)
              a.college = res.data.data.college
              localStorage.setItem('approval-system-college', res.data.data.college)
              a.name = res.data.data.name
              localStorage.setItem('approval-system-name', res.data.data.name)
              a.major = res.data.data.major ?? '未知'
              localStorage.setItem('approval-system-major', res.data.data.major ? res.data.data.major : '未知')
              a.contact = res.data.data.contact ?? '未知'
              localStorage.setItem('approval-system-contact', res.data.data.contact ? res.data.data.contact : '未知')
              return a
            })
            setTimeout(() => {
              notification.success({
                message: '😸️ 登录成功',
                description: res.data.data.code + '' + res.data.data.name + ' 欢迎回来',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else {
            setTimeout(() => {
              notification.error({
                message: '😭️ 用户信息获取失败',
                description: res.data.errMsg,
                top: 20,
                placement: 'top',
              })
            }, 300)
          }
        })
        switch (res.data.data.role) {
          case 0:
            setUserState('user')
            localStorage.setItem('userState', 'user')
            break
          case 1:
            setUserState('judge')
            localStorage.setItem('userState', 'judge')
            break
          case 2:
            setUserState('approver')
            localStorage.setItem('userState', 'approver')
            break
          case 3:
            setUserState('admin')
            localStorage.setItem('userState', 'admin')
            break
          default:
            break
        }
      } else {
        setTimeout(() => {
          notification.error({
            message: '😭️ 登录失败',
            description: res.data.errMsg,
            top: 20,
            placement: 'top',
          })
        }, 300)
        setGetValidateCode((prev) => {
          return prev + 1
        })
      }
      // console.log(res)
    })
  }

  //退出登录时将会执行这里的 logout 函数
  const logout = () => {
    setUserState('offline')
    localStorage.clear()
    localStorage.setItem('userState', 'offline')
    setNavigation('/')
    navigate('/')
    setTimeout(() => {
      notification.info({
        message: '👋🏻️ 已退出登录',
        description: '期待与你下次相见',
        top: 20,
        placement: 'top',
      })
    }, 300)
  }

  //通过state触发验证码刷新
  const getValidateId = (validateId: string) => {
    setValidateCodeId(validateId)
  }

  // console.log(validateCodeId)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" style={{ padding: " 0 15px" }}>
        <div className="header-wrap">
          <div className="logo-wrap">
            {/* <div className="logo"></div> */}
            {/* <h1 className="logo-name">通用比赛管理评审系统</h1> */}
            <img src={LogoSvg} alt='Logo' style={{ height: "75%" }} />
          </div>
          <div className="control-wrap">
            {localStorage.getItem('userState') === 'offline' ? (
              <></>
            ) : (
              <Fragment>
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
                  <div className="username">{userProfile.name}</div>
                </div>
                <div className="control-item" onClick={logout}>
                  <ExportOutlined
                    style={{
                      fontSize: '24px',
                    }}
                  ></ExportOutlined>
                </div>
              </Fragment>
            )}
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
            <LoginForm finishCb={onFinish} setCodeId={getValidateId} getValidateCode={getValidateCode}></LoginForm>
          ) : (
            <UserProfile code={userProfile.code} name={userProfile.name} logout={logout} />
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
