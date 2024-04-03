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
  const role = localStorage.getItem('userState')
  const reviewValue = role === 'judge' ? '比赛审核' : '比赛评审'
  const handleGoBack = () => {
    window.history.back()
  }
  const breadcrumbNameMap: Record<string, string> = {
    '/activity': '比赛入口',
    '/inbox': '收件箱',
    '/manage': '比赛管理',
    '/create': '创建比赛',
    '/account': '我的帐号',
    '/review': reviewValue,
    '/list': '项目列表',
    '/detail': '比赛列表',
    '/register': '比赛报名',
    '/register-detail': '报名参加详情',
    '/notice': '发布公告',
    '/work-detail': '项目提交信息',
    '/edit': '编辑',
    editWhiteList: '编辑白名单',
  }
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)
  const extraBreadcrumbItems = pathSnippets.map((item, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
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

  //筛选出面包屑内容为空的Item (无activity)
  const filterBreadcrumbItems =
    extraBreadcrumbItems.filter(item =>
      item.props.children.props.children !== undefined)


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
  ].concat(filterBreadcrumbItems)
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
