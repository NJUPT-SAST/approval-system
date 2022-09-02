import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import * as Sentry from '@sentry/react'
import 'antd/dist/antd.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserTracing } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://32dacfcf7d534a25bd550484859bcdc2@o1303856.ingest.sentry.io/6701530',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: 'approve-system@' + process.env.npm_package_version,
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
