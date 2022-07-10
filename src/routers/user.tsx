import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Account from '../pages/account'
import Activity from '../pages/activity'
import ActivityDetail from '../pages/activityDetail'
import Home from '../pages/home'
import Inbox from '../pages/inbox'
import NoMatch from '../pages/noMatch'
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
      { path: 'inbox', element: <Inbox /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default user
