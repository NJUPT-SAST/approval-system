import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import React from 'react'

interface loginFormProp {
  finishCb: (values: any) => void
}
function LoginForm(props: loginFormProp) {
  return (
    <Form name="normal_login" className="login-form" onFinish={props.finishCb}>
      <div className="avatar"></div>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
