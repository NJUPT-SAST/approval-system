import { RollbackOutlined, SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import Input from 'antd/lib/input'
import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

const { Search } = Input

function Activity() {
  const onSearch = () => {
    console.log('searching')
  }
  return (
    <div className="activity">
      <TopBar />
      <div className="searchBody">
        <Search placeholder="搜索比赛活动或关键词" className="searchBar" onSearch={onSearch} enterButton={`搜索`} />
      </div>
      <div className="filter"></div>
      <div className="activitiesBody"></div>
    </div>
  )
}

export default Activity
