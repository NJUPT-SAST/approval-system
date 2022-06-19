import { ExportOutlined, QuestionCircleOutlined, SearchOutlined, BellOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout } from 'antd'
import React from 'react'
import UnLoginMenu from './components/UnLoginMenu'
import './index.scss'

const { Header, Content, Sider } = Layout

const Home = () => (
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
      <Sider width={200} className="site-layout-background">
        <UnLoginMenu></UnLoginMenu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>
)

export default Home
