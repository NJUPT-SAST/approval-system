import React from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Account from '../pages/account'
import Inbox from '../pages/inbox'
import Review from '../pages/review'
import NoMatch from '../pages/noMatch'
import ReviewApprover from '../pages/reviewJudge'
import ReviewList from '../pages/reviewList'

const approver: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      {
        path: 'review',
        element: <Review />,
        children: [
          {
            path: 'detail',
            element: <ReviewApprover />,
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
export default approver
