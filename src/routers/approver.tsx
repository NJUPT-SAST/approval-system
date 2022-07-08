import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Account from '../pages/account'
import Inbox from '../pages/inbox'
import Review from '../pages/review'
import NoMatch from '../pages/noMatch'

const approver: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'account', index: true, element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'review', element: <Review /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default approver
