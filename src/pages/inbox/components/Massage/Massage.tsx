import { Button } from 'antd'
import React from 'react'
import { massageType } from '../../../../test/Inbox-massage'
import './Massage.scss'
const Massage: React.FC<massageType> = (massage: massageType) => {
  return (
    <>
      <div className="inbox-massage-nav-unfold">
        <Button type="primary" className="inbox-massage-display-switch-button">
          {' '}
        </Button>
      </div>
      <div className="inbox-massage-body-unfold">
        <div className="inbox-massage-header">{massage.title}</div>
        <div className="inbox-massage-contents">{massage.content}</div>
        <div className="inbox-massage-footer">
          <div className="inbox-massage-footer-post">
            由 {massage.post} 发布于 {massage.time}
            <div className="inbox-massage-footer-button">
              <Button type="primary">已读</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Massage
