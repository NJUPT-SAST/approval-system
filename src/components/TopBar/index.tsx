import { RollbackOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import React, { Fragment } from 'react'
import { useLocation, Link } from 'react-router-dom'
import './index.scss'

/**
 * 顶部面包屑与返回上一页的小栏
 */
function TopBar(props?: { activity?: string }) {
  // let processedExtraBreadcrumbItems = [<Fragment key="emptyElement"></Fragment>]
  const handleGoBack = () => {
    window.history.back()
  }
  const breadcrumbNameMap: Record<string, string> = {
    '/activity': '活动广场',
    '/inbox': '收件箱',
    '/manage': '活动管理',
    '/create': '创建活动',
    '/account': '我的帐号',
    '/review': '活动评审',
    '/review/list': '挑战杯',
    '/register': '活动报名',
    '/register-detail': '报名参加详情',
    '/notice': '发布公告',
    '/work-detail': '作品提交信息',
    '/edit': '编辑',
  }
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const extraBreadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    // console.log(url)
    if (!isNaN(Number(pathSnippets[index])) && props?.activity !== undefined) {
      return (
        <Breadcrumb.Item key="current-activity" className="breadCrumbItem">
          <Link to={url}>{props.activity.toString()}</Link>
        </Breadcrumb.Item>
      )
    } else {
      return (
        <Breadcrumb.Item key={url} className="breadCrumbItem">
          <Link to={url}>{breadcrumbNameMap['/' + item]}</Link>
        </Breadcrumb.Item>
      )
    }
  })
  // if (props?.activity !== null) {
  //   processedExtraBreadcrumbItems = extraBreadcrumbItems.slice(0, 1)
  //   // console.log(extraBreadcrumbItems.slice(0,1))
  // }
  // const moreExtraBreadcrumbItems = () => {
  //   if (props?.activity !== undefined) {
  //     return [
  //       <Breadcrumb.Item key="current-activity" className="breadCrumbItem">
  //         <Link to="#title">{props.activity.toString()}</Link>
  //       </Breadcrumb.Item>,
  //     ]
  //   } else {
  //     return [
  //       <Breadcrumb.Item key="current-activity" className="breadCrumbItem">
  //         <Link to="#title">{null}</Link>
  //       </Breadcrumb.Item>,
  //     ]
  //   }
  // }
  const breadcrumbItems = [
    <Breadcrumb.Item key="home" className="breadCrumbItem">
      <Link to="/">主页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)
  // .concat(moreExtraBreadcrumbItems())
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
