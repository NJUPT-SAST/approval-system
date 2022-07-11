import { RollbackOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './index.scss'

function TopBar() {
  const handleGoBack = () => {
    window.history.back()
  }
  const breadcrumbNameMap: Record<string, string> = {
    '/activity': '活动广场',
    '/inbox': '收件箱',
    '/manage': '活动管理',
    '/account': '我的帐号',
    '/review': '活动评审',
    '/review/detail': '挑战杯',
  }
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url} className="breadCrumbItem">
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key="home" className="breadCrumbItem">
      <Link to="/">主页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)
  return (
    <div className="topBar">
      <Breadcrumb style={{ marginTop: '5px' }}>{breadcrumbItems}</Breadcrumb>
      <Button type="link" onClick={handleGoBack} icon={<RollbackOutlined />}>
        返回上一级
      </Button>
    </div>
  )
}

export default TopBar
