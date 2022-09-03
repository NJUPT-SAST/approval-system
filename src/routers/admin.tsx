import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Inbox from '../pages/inbox'
import Account from '../pages/account'
import Manage from '../pages/manage'
import NoMatch from '../pages/noMatch'
import Activity from '../pages/activity'
import ActivityDetail from '../pages/activityDetail'
import Register from '../pages/register'
import ManageDetail from '../pages/manageDetail'
import Notice from '../pages/notice'
import Create from '../pages/create'

const admin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'manage', element: <Manage /> },
      { path: 'activity', element: <Activity /> },
      { path: 'activity/:id', element: <ActivityDetail /> },
      { path: 'activity/:id/register', element: <Register /> },
      { path: 'activity/:id/manage', element: <ManageDetail /> },
      { path: 'activity/:id/notice/:id', element: <Notice /> },
      { path: 'manage/:id/notice', element: <Notice /> },
      { path: 'activity/:id/manage/edit', element: <Create /> },
      { path: 'manage/create', element: <Create /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default admin
