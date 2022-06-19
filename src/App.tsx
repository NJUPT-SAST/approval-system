import React from 'react'
import { useRoutes } from 'react-router-dom'
import { unLogin } from './routers'
import './App.scss'

function App() {
  const unLoginEle = useRoutes(unLogin)
  return <>{unLoginEle}</>
}

export default App
