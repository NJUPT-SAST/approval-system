import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Index from '../pages/index'
import NoMatch from '../pages/noMatch'
import News from '../pages/news'
import Activity from '../pages/activity'
import Review from '../pages/review'

const admin: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Index /> },
      { path: 'news', element: <News /> },
      { path: 'activity', element: <Activity /> },
      { path: 'review', element: <Review /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default admin
