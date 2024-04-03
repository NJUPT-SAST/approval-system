import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input, InputRef } from 'antd'
import React, { createRef, Ref, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { getValidateCode } from '../../../api/public'

interface loginFormProp {
  finishCb: (values: any) => void
  setCodeId: (validateCodeId: string) => void
  getValidateCode: number
}
/**
 * 刷新验证码的hook
 * @param flag 本地的验证码刷新触发器
 * @param homeFlag 来自home页面的验证码触发器
 * @returns 验证码图片和验证码id
 */
const useValidateCode = (flag: any, homeFlag: any) => {
  const [validateImgData, setValidateImgData] = useState<Blob>()
  const [validateCodeId, setValidateCodeId] = useState('')
  useEffect(() => {
    getValidateCode().then((res) => {
      setValidateImgData(res.data)
      setValidateCodeId(res.headers.captcha)
    })
  }, [flag, homeFlag])
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
  const [refreshValidateCode, setFreshValidateCode] = useState(1)
  const [validateValue, setValidateValue] = useState('')
  const [validateCode, codeUUID] = useValidateCode(refreshValidateCode, props.getValidateCode)
  const clearRef = useRef(null)

  //触发刷新验证码
  const refreshCode = () => {
    setFreshValidateCode((prev) => {
      return prev + 1
    })
  }

  //本来这个位置是想每次验证码刷新都会清空输入框，但是暂时没想到办法实现
  useEffect(() => {
    // console.log(typeof(clearRef.current))
    setValidateValue('')
  }, [refreshValidateCode, props.getValidateCode])

  //将验证码转换成本地链接给img读取
  let validateCodeUrl
  if (validateCode !== undefined && typeof validateCode !== 'string') {
    validateCodeUrl = window.URL.createObjectURL(validateCode)
  }
  if (typeof codeUUID === 'string') {
    props.setCodeId(codeUUID)
  }

  return (
    <Form name="normal_login" className="login-form" onFinish={props.finishCb}>
      <div className='login-container'>
        <div className="avatar"></div>
        <div className={'login-title'}>通用比赛管理评审系统</div>
        <Form.Item
          className="login-form-body"
          name="username"
          rules={[{ required: false, message: '请输入正确的用户名！' }]}
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
            rules={[{ required: false, message: '验证码错误！' }]}
          >
            <Input
              className="login-form-input validate"
              id="validate"
              prefix={<SafetyOutlined className="site-form-item-icon" />}
              placeholder="Validate code"
              // value={validateValue}
              // onChange={value=>{setValidateValue(value.target.value)}}
              ref={clearRef}
            />
          </Form.Item>
          <img src={validateCodeUrl} alt="validate code" className="validate-img" onClick={refreshCode} />
        </div>
        <Form.Item style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default LoginForm
