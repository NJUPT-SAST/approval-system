import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Inbox from '../pages/inbox'
import Account from '../pages/account'
import Manage from '../pages/manage'
import NoMatch from '../pages/noMatch'
import Activity from '../pages/activity'

const admin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'account', index: true, element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'manage', element: <Manage /> },
      { path: 'activity', element: <Activity /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default admin
