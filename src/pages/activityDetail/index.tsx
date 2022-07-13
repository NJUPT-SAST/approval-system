import { Anchor, Button, List, Timeline } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

const { Link } = Anchor

function ActivityDetail() {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)
  const userState = localStorage.getItem('userState')
  const navigate = useNavigate()

  /**
   * 调用函数根据不同的角色信息获取不同的按钮显示文字
   * @returns 角色相应按钮信息
   */
  const buttonContent = () => {
    switch (userState) {
      case 'admin':
        return '管理'
      case 'user':
        return '报名'
      case 'judge':
        return '评审'
      case 'approver':
        return '审批'
      default:
        return '请先登录'
    }
  }

  const handleButtonAction = () => {
    if (userState === 'user') {
      navigate('/activity/10001/register')
    }
  }

  //notice数据
  const noticeData = [
    { date: '2022-05-20', content: '活动结束啦，请大家在...' },
    { date: '2022-05-20', content: '活动结束啦，请大家在...' },
    { date: '2022-05-20', content: '活动结束啦，请大家在...' },
    { date: '2022-05-20', content: '活动结束啦，请大家在...' },
    { date: '2022-05-20', content: '活动结束啦，请大家在...' },
  ]

  useEffect(() => {
    // 计算锚点偏移位置并写入state
    setTargetOffset(window.innerHeight / 2)
  }, [])

  return (
    <div>
      <TopBar activity="“挑战杯”创新创业大赛" />
      <div className="activity-detail-body">
        <div className="activity-detail-box">
          <img src="https://img.js.design/assets/smartFill/img432164da758808.jpg" className="cover" alt="cover" />
          <div className="activity-content-body">
            <div className="navigator">
              <Anchor targetOffset={targetOffset}>
                <Link href="#title" title="导航" />
                <Link href="#description" title="比赛介绍" />
                <Link href="#notice" title="最新公告" />
                <Link href="#arrangement" title="时间安排" />
              </Anchor>
            </div>
            <div className="activity-content">
              <div className="title-section" id="title">
                <div className="title">“挑战杯”创新创业大赛</div>
                <div className="action-button">
                  <Button type="primary" onClick={handleButtonAction}>
                    {buttonContent()}
                  </Button>
                </div>
              </div>
              <div className="description" id="description">
                现在很多APP在用户截图时会自动提示用户是否要进行分享。这个时机确实抓的很棒，一般来说，用户截图大多数时候都是为了分享给他人，少部分是为了留底备份。
                用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有吸引力的核心前提下，仔细揣摩用户心理，结合产品本身的特色，在不同情境下提供给用户最合适的分享平台及方式，让用户分享成为一种水到渠成的自然行为，甚至在某些时候还能给用户带来一些小的惊喜就更棒了。
                往年作品https://wangnianxiangmuzhanshi.com/...
              </div>
              <div className="announcement-section">
                <div className="notice" id="notice">
                  <div className="notice-title">消息/公告</div>
                  <div className="notice-table">
                    <List
                      bordered
                      dataSource={noticeData}
                      renderItem={(item) => (
                        <>
                          <List.Item>
                            {item.date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.content}
                          </List.Item>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="arrangement" id="arrangement">
                  <div className="arrangement-title">时间安排</div>
                  <div className="arrangement-content">
                    <Timeline>
                      <Timeline.Item>活动发布时间 2022-02-22</Timeline.Item>
                      <Timeline.Item>报名开始时间 2022-02-22</Timeline.Item>
                      <Timeline.Item>报名截止时间 2022-05-20</Timeline.Item>
                      <Timeline.Item>活动结束时间 2022-05-20</Timeline.Item>
                    </Timeline>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityDetail
