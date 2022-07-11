import { Button } from 'antd'
import React, { useReducer } from 'react'
import TopBar from '../../components/TopBar'
import massage from '../../test/Inbox-massage'
import Massage from './components/Massage/Massage'
import './index.scss'

const Inbox: React.FC = () => {
  return (
    <div>
      <TopBar />
      <div className="inbox-button-nav">
        <div className="inbox-button">
          <Button type="primary" className="inbox-massage-control-button">
            全部已读
          </Button>
          <Button type="primary" className="inbox-massage-control-button">
            全部收起
          </Button>
          <Button type="primary" className="inbox-massage-control-button">
            全部展开
          </Button>
        </div>
      </div>
      <Massage {...massage[0]} />
      <Massage {...massage[1]} />
    </div>
  )
}

export default Inbox
