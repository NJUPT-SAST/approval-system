import { message, notification } from 'antd'
import axios from 'axios'
import { Location, useNavigate } from 'react-router-dom'

export const apis = axios.create({
  timeout: 2000,
})

apis.interceptors.request.use((config: any) => {
  if (localStorage.getItem('token') !== null) {
    config.headers['Token'] = localStorage.getItem('token')
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
          onClose() {
            localStorage.clear()
            localStorage.setItem('userState', 'offline')
            window.location.href = '/'
          },
        })
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
      //   notification.error({
      //     message: '⚠️️ 发生错误，请告知管理员',
      //     description: res.data,
      //     top: 20,
      //     placement: 'top',
      //   })
      //   break
    }
  }
  return res
})
