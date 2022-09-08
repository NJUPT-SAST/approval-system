import React, { Children } from 'react'
import type { RouteObject } from 'react-router-dom'
import Home from '../pages/home'
import Account from '../pages/account'
import Inbox from '../pages/inbox'
import Review from '../pages/review'
import NoMatch from '../pages/noMatch'
import ReviewApprover from '../pages/reviewApprover'
import ReviewList from '../pages/reviewList'
import Activity from '../pages/activity'
import ActivityDetail from '../pages/activityDetail'

const approver: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Account /> },
      { path: 'account', element: <Account /> },
      { path: 'inbox', element: <Inbox /> },
      { path: 'activity', element: <Activity /> },
      { path: 'activity/:id', element: <ActivityDetail /> },
      { path: 'review', element: <Review /> },
      { path: 'review/detail/:id', element: <ReviewApprover /> },
      { path: 'review/list/:comId/:page', element: <ReviewList /> },
      { path: '*', element: <NoMatch /> },
    ],
  },
]
export default approver
