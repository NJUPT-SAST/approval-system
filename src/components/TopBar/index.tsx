import { RollbackOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import React, { Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './index.scss'

/**
 * 顶部面包屑与返回上一页的小栏
 */
function TopBar(props?: { breadcrumb?: string }) {
  let processedExtraBreadcrumbItems = [<Fragment key="emptyElement"></Fragment>]
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
    // console.log(pathSnippets.slice(0, index + 1))
    return (
      <Breadcrumb.Item key={url} className="breadCrumbItem">
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })
  if (props?.breadcrumb !== undefined || props?.breadcrumb !== null) {
    processedExtraBreadcrumbItems = extraBreadcrumbItems.slice(0, 1)
    // console.log(extraBreadcrumbItems.slice(0,1))
  }
  const moreExtraBreadcrumbItems = () => {
    if (props?.breadcrumb !== undefined) {
      return [
        <Breadcrumb.Item key="current-activity" className="breadCrumbItem">
          <Link to="#title">{props.breadcrumb.toString()}</Link>
        </Breadcrumb.Item>,
      ]
    } else {
      return [
        <Breadcrumb.Item key="current-activity" className="breadCrumbItem">
          <Link to="#title">{null}</Link>
        </Breadcrumb.Item>,
      ]
    }
  }
  const breadcrumbItems = [
    <Breadcrumb.Item key="home" className="breadCrumbItem">
      <Link to="/">主页</Link>
    </Breadcrumb.Item>,
  ]
    .concat(processedExtraBreadcrumbItems)
    .concat(moreExtraBreadcrumbItems())
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
