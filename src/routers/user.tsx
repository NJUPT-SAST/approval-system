import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Account from '../pages/account'
import Activity from '../pages/activity'
import ActivityDetail from '../pages/activityDetail'
import Home from '../pages/home'
import Inbox from '../pages/inbox'
import NoMatch from '../pages/noMatch'
import Register from '../pages/register'
import RegisterDetail from '../pages/registerDetail'
import WorkDetail from '../pages/workDetail'
// import Result from '../pages/result'

const user: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      // { index: true, element: <Index /> },
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'activity', element: <Activity /> },
      { path: 'activity/:id', element: <ActivityDetail /> },
      { path: 'activity/:id/register', element: <Register /> },
      { path: 'activity/:id/register-detail', element: <RegisterDetail /> },
      { path: 'activity/:id/work-detail', element: <WorkDetail /> },
      { path: 'inbox', element: <Inbox /> },
      { path: '*', element: <NoMatch /> },
      // { path: 'result', element: <Result /> },
    ],
  },
]
export default user
