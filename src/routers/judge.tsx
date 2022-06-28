import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/index/index'
import NoMatch from '../pages/noMatch'
import Score from '../pages/score'

const judge: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      { path: 'score', element: <Score /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default judge
