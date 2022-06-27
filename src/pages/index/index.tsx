import React from 'react'
import { Layout, Col, Row } from 'antd'
import LoginForm from './components/LoginForm'
import './index.scss'

const { Header, Content } = Layout

function Index() {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Layout style={{ height: '100%' }}>
      <div className="welcome-wrap">
        <div className="user-avatar"></div>
        <div className="welcome--title-wrap">
          <div className="welcome-title"></div>
          <div className="welcome-msg"></div>
        </div>
        <div className="system-msg">
          {[
            { title: 'Projects', content: 56 },
            { title: 'Projects', content: 56 },
            { title: 'Projects', content: 56 },
          ].map((value, index) => {
            return (
              <div key={index} className="msg-item">
                <div className="item-title">{value.title}</div>
                <div className="item-content">{value.content}</div>
              </div>
            )
          })}
        </div>
      </div>
      <Content style={{ padding: '24px', margin: 0, minHeight: 'calc(100% - 100px)' }}>
        <Row style={{ height: '50%' }} gutter={[24, 16]}>
          <Col span={16}></Col>
          <Col span={8}>
            <div className="login-wrap">
              <LoginForm></LoginForm>
            </div>
          </Col>
        </Row>
        <Row style={{ height: '50%' }}>
          <Col span={16}> </Col>
          <Col span={8}> </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Index
