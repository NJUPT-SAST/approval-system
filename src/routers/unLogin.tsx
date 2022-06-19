import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import NoMatch from '../pages/noMatch'
const unLogin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [{ path: '*', element: <NoMatch /> }],
  },
]
export default unLogin
