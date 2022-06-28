import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/index'
import Team from '../pages/team'
import Apply from '../pages/apply'
import NoMatch from '../pages/noMatch'
const user: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      { path: 'team', element: <Team /> },
      { path: 'apply', element: <Apply /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default user
