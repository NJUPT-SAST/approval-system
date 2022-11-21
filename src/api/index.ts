import { message, notification } from 'antd'
import axios from 'axios'
import { Location, useNavigate } from 'react-router-dom'

const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : '/api'

export const apis = axios.create({
  baseURL: baseUrl,
})

apis.interceptors.request.use((config: any) => {
  if (localStorage.getItem('approval-system-token') !== null) {
    config.headers['Token'] = localStorage.getItem('approval-system-token')
  }
  return config
})
apis.interceptors.response.use((res) => {
  if (!res.data.success) {
    switch (res.data.errCode) {
      case 1003:
        message.loading({
          content: '⚠️️ 登录已过期,正在重定向到登录页',
          // description: '请重新登录',
          // top: 20,
          // placement: 'top',
          key: 'unlogin',
        })
        ;(function () {
          localStorage.clear()
          localStorage.setItem('userState', 'offline')
          window.location.href = '/'
        })()
        break
      case 1005:
        message.loading({
          content: '⚠️️ 登录已过期,正在重定向到登录页',
          // description: '请重新登录',
          // top: 20,
          // placement: 'top',
          key: 'unlogin',
        })
        ;(function () {
          localStorage.clear()
          localStorage.setItem('userState', 'offline')
          window.location.href = '/'
        })()
        break
      // case 1000:
      //   console.log(res.data.errMsg)
      //   notification.error({
      //       message: '😭️ 登录失败, 请刷新重试',
      //       description: res.data.errMsg,
      //       top: 20,
      //       placement: 'top',
      //     })
      //   break
      // default:
      //   console.log(res)
      //   message.error({
      //     content: '⚠️️ 发生错误，请告知管理员',
      //     duration: 5,
      //     key:'error'
      //   })
      //   break
    }
  }
  return res
})
