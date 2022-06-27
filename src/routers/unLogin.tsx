import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/index'
import NoMatch from '../pages/noMatch'
const unLogin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default unLogin
