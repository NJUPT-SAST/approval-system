import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Account from '../pages/account'
import Activity from '../pages/activity'
import NoMatch from '../pages/noMatch'
import ActivityDetail from '../pages/activityDetail'
const unLogin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Activity /> },
      { path: 'account', element: <Account /> },
      { path: 'activity', element: <Activity /> },
      { path: 'activity/:id', element: <ActivityDetail /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default unLogin
