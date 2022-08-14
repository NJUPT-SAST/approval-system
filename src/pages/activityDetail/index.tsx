import { Anchor, Button, List, Timeline } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCompetitionNoticeList } from '../../api/public'
import { getCompetitionInfo } from '../../api/user'
import TopBar from '../../components/TopBar'
import { competitionInfoType } from '../../type/apiTypes'
import './index.scss'

const { Link } = Anchor

interface competitionDetailType {
  introduce: string
  name: string
  regBegin: string
  regEnd: string
  reviewBegin: string
  reviewEnd: string
  status: number
  submitBegin: string
  submitEnd: string
}

const useGetCompetitionDetail = (id: number) => {
  const [competitionDetail, setCompetitionDetail] = useState<competitionDetailType>({
    introduce: '载入中',
    name: '载入中',
    regBegin: '载入中',
    regEnd: '载入中',
    reviewBegin: '载入中',
    reviewEnd: '载入中',
    status: 0,
    submitBegin: '载入中',
    submitEnd: '载入中',
  })
  useEffect(() => {
    getCompetitionInfo(Number(id)).then((res) => {
      // console.log(res)
      setCompetitionDetail(res.data.data)
    })
  }, [])
  return competitionDetail
}

const useGetCompetitionNotice = (id: number) => {
  const [competitionNoticeList, setCompetitionNoticeList] = useState()
  getCompetitionNoticeList(id).then((res) => {
    console.log(res)
  })
}

function ActivityDetail() {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)
  const userState = localStorage.getItem('userState')
  const navigate = useNavigate()
  const { id } = useParams()
  const competitionDetail: competitionDetailType = useGetCompetitionDetail(Number(id))
  console.log(competitionDetail)
  useGetCompetitionNotice(Number(id))

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
      navigate('/activity/' + id + '/register')
    } else if (userState === 'judge') {
      navigate('/review')
    } else if (userState === 'admin') {
      navigate('/activity/' + id + '/manage')
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
      <TopBar activity={competitionDetail.name} />
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
                <div className="title">{competitionDetail.name}</div>
                <div className="action-button">
                  <Button type="primary" onClick={handleButtonAction}>
                    {buttonContent()}
                  </Button>
                </div>
              </div>
              <div className="description" id="description">
                {competitionDetail.introduce}
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
                      {/* <Timeline.Item>活动发布时间 {competitionDetail.regBegin}</Timeline.Item> */}
                      <Timeline.Item>报名开始时间 {competitionDetail.regBegin}</Timeline.Item>
                      <Timeline.Item>报名截止时间 {competitionDetail.regEnd}</Timeline.Item>
                      <Timeline.Item>评审开始时间 {competitionDetail.reviewBegin}</Timeline.Item>
                      <Timeline.Item>评审结束时间 {competitionDetail.reviewEnd}</Timeline.Item>
                      {/* <Timeline.Item>活动结束时间 {competitionDetail.reviewEnd}</Timeline.Item> */}
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
