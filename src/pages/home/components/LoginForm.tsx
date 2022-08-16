import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { getValidateCode } from '../../../api/public'

interface loginFormProp {
  finishCb: (values: any) => void
  setCodeId: (validateCodeId: string) => void
}

const useValidateCode = () => {
  const [validateImgData, setValidateImgData] = useState<Blob>()
  const [validateCodeId, setValidateCodeId] = useState('')
  useEffect(() => {
    getValidateCode().then((res) => {
      setValidateImgData(res.data)
      setValidateCodeId(res.headers.captcha)
    })
  }, [])
  return [validateImgData, validateCodeId]
}

const BlobConvertBase64 = (imgData: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
      resolve(e.target.result)
    }
    // readAsDataURL
    fileReader.readAsDataURL(imgData)
    fileReader.onerror = () => {
      reject(new Error('文件流异常'))
    }
  })
}

function LoginForm(props: loginFormProp) {
  const [validateCode, codeUUID] = useValidateCode()
  let validateCodeUrl
  if (validateCode !== undefined && typeof validateCode !== 'string') {
    validateCodeUrl = window.URL.createObjectURL(validateCode)
  }
  if (typeof codeUUID === 'string') {
    props.setCodeId(codeUUID)
  }
  return (
    <Form name="normal_login" className="login-form" onFinish={props.finishCb}>
      <div className="avatar"></div>
      <Form.Item
        className="login-form-body"
        name="username"
        rules={[{ required: true, message: '请输入正确的用户名！' }]}
      >
        <Input
          className="login-form-input"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        className="login-form-body"
        name="password"
        rules={[{ required: false, message: '请输入正确的密码！' }]}
      >
        <Input
          className="login-form-input"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <div className="validate-part-body">
        <Form.Item
          name="validate"
          className="validate-input login-form-body"
          rules={[{ required: true, message: '验证码错误！' }]}
        >
          <Input
            className="login-form-input validate"
            prefix={<SafetyOutlined className="site-form-item-icon" />}
            placeholder="Validate code"
          />
        </Form.Item>
        <img src={validateCodeUrl} alt="validate code" className="validate-img" />
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
