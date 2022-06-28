import React, { useEffect, useRef } from 'react'
import { useRoutes } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import userStateStore from './store/userState'
import { unLogin, admin, approver, user, judge } from './routers'
import './App.scss'

function App() {
  const [userState, setUserState] = useRecoilState(userStateStore)
  const unLoginEle = useRoutes(unLogin)
  const adminEle = useRoutes(admin)
  const approverEle = useRoutes(approver)
  const userEle = useRoutes(user)
  const judgeEle = useRoutes(judge)
  const eleMap = new Map()
  eleMap.set('offline', unLoginEle)
  eleMap.set('admin', adminEle)
  eleMap.set('approver', approverEle)
  eleMap.set('user', userEle)
  eleMap.set('judge', judgeEle)
  // console.log(eleMap.get(userState))
  return <>{eleMap.get(userState)}</>
}

export default App
