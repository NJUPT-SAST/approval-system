import { ExportOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import React, { useState } from 'react'
import UnLoginMenu from './components/UnLoginMenu'
import './index.scss'

const { Header, Content, Sider } = Layout

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
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
            <div className="control-item">
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
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          className="site-layout-background"
        >
          <UnLoginMenu></UnLoginMenu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
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
