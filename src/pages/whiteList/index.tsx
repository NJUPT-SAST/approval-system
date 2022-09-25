import React from 'react'
import { Button } from 'antd'
import TopBar from '../../components/TopBar'
import { useNavigate, useLocation } from 'react-router-dom'
import WhiteListdetail from './components/whiteListdetail'
import './index.scss'
// type WhiteListProps = {
//   competitionId: number
// }

function useMyLocation<T>() {
  return useLocation() as { state: T }
}
const WhiteList: React.FC = () => {
  const {
    state: { competitionName, competitionId },
  } = useMyLocation<{ competitionName: string; competitionId: number }>()
  return (
    <>
      <TopBar activity={competitionName}></TopBar>
      <div className="whiteList-bar">
        <Button type="primary">完成</Button>
      </div>
      <div className="whiteList-container">
        <div className="whiteList-something"></div>
        <div className="whiteList-container-body">
          <WhiteListdetail />
        </div>
      </div>
    </>
  )
}
export default WhiteList
