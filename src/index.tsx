import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import * as Sentry from "@sentry/react";
import 'antd/dist/antd.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import { LoadingOutlined } from '@ant-design/icons'
// import { Spin } from 'antd'

Sentry.setContext('用户信息', {
  姓名: '' + localStorage.getItem('approval-system-name'),
  学号: '' + localStorage.getItem('approval-system-code'),
})

Sentry.setUser({
  id: '' + localStorage.getItem('approval-system-code'),
  username: '' + localStorage.getItem('approval-system-name'),
})

Sentry.init({
  dsn: 'https://1c5ba9e4927f4530e4edff132d922d71@o4507027967967232.ingest.us.sentry.io/4507027970457600',
  integrations: [Sentry.browserTracingIntegration(),
  Sentry.replayIntegration({
    maskAllText: false,
    blockAllMedia: false,
    networkDetailAllowUrls: [window.location.origin],
  }),],
  beforeSend(event, hint) {
    if (event.exception) {
      Sentry.showReportDialog({
        eventId: event.event_id,
        user: {
          name: '' + localStorage.getItem('approval-system-name'),
        },
        title: '🤕 抱歉，我们似乎遇到了一些问题',
        subtitle: '别担心，我们的开发团队已经收到了相关提醒',
        subtitle2: ' 为了未来提供更好的体验，请告诉我们错误的发生的详细信息',
        labelName: '名称',
        labelEmail: '联系方式',
        labelComments: '发生了什么？',
        labelSubmit: '提交',
        errorGeneric: 'oh，🤯，又发生了个未知的错误，我们已经了解了，麻烦你可以再提交一次试试吗？',
        errorFormEntry: '提交的表单似乎还没写完，把错误信息都消除后再试一次吧！',
        successMessage: '👌🏻 感谢你的反馈，我们会尽快修复问题',
      })
    }
    return event
  },
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: 'approve-system@' + process.env.npm_package_version,
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/approve\.sast\.fun\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
