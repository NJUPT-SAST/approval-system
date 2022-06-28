import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/index'
import NoMatch from '../pages/noMatch'
import Approve from '../pages/approve'

const approver: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      { path: 'approve', element: <Approve /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default approver
