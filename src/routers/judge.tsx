import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Review from '../pages/review'
import Inbox from '../pages/inbox'
import NoMatch from '../pages/noMatch'
import Account from '../pages/account'
import ReviewJudge from '../pages/reviewJudge'
import ReviewList from '../pages/reviewList'
import Activity from '../pages/activity'
import ActivityDetail from '../pages/activityDetail'

const judge: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'activity', element: <Activity /> },
      { path: 'activity/:id', element: <ActivityDetail /> },
      {
        path: 'review',
        element: <Review />,
        children: [
          {
            path: 'detail',
            element: <ReviewJudge />,
          },
          {
            path: 'list',
            element: <ReviewList />,
          },
        ],
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default judge
