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
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: false, message: 'Please input your Password!' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
      </Form.Item>
      <div className="validate-part-body">
        <Form.Item
          name="validate"
          className="validate-input"
          rules={[{ required: true, message: 'Please input the validate code!' }]}
        >
          <Input prefix={<SafetyOutlined className="site-form-item-icon" />} placeholder="Validate code" />
        </Form.Item>
        <img src={validateCodeUrl} alt="validate code" className="validate-img" />
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
