import { LoadingOutlined } from '@ant-design/icons'
import { Anchor, Button, Empty, List, message, notification, Skeleton, Timeline } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { getJudgeWorkTotal, getScoreWorkTotal } from '../../api/judge'
import { getCompetitionNoticeList } from '../../api/public'
import { getCompetitionInfo, getTeamInfo } from '../../api/user'
import CompetitionNotice from '../../components/CompetitionNotice'
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
  cover: string
}

function ActivityDetail() {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)
  const userState = localStorage.getItem('userState')
  const [isLoading, setIsLoading] = useState(true)
  const [entranceAvailable, setEntranceAvailable] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const btn = (
    <Button
      type="primary"
      onClick={() => {
        navigate('/review')
        notification.close('no-item')
      }}
    >
      马上前往
    </Button>
  )
  // console.log(competitionDetail)

  /**
   * 获取比赛的详细信息
   * @param id 比赛的id
   * @returns 返回比赛详细信息的state
   */
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
      cover: '',
    })
    useLayoutEffect(() => {
      setIsLoading(true)
      getCompetitionInfo(Number(id)).then((res) => {
        console.log(res)
        setCompetitionDetail(res.data.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      })
      if (userState === 'approver') {
        getScoreWorkTotal(id).then((res) => {
          console.log(res.data)
          if (res.data.data !== 0) {
            setEntranceAvailable(true)
          }
        })
      }
      if (userState === 'judge') {
        getJudgeWorkTotal(id).then((res) => {
          console.log(res.data)
          if (res.data.data !== 0) {
            setEntranceAvailable(true)
          }
        })
      }
      if (userState === 'user') {
        getTeamInfo(Number(id)).then((res) => {
          if (res.data.errMsg !== '您还未报名该比赛') {
            setIsSigned(true)
          }
        })
      }
    }, [])
    return competitionDetail
  }

  /**
   * 获取比赛公告的hook
   * @param id 比赛的id
   * @returns 返回比赛比赛通知公告的state
   */
  const useGetCompetitionNotice = (id: number) => {
    const [competitionNoticeList, setCompetitionNoticeList] = useState([])
    useLayoutEffect(() => {
      setIsLoading(true)
      getCompetitionNoticeList(id).then((res) => {
        // console.log(res)
        setCompetitionNoticeList(res.data.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      })
    }, [])
    return competitionNoticeList
  }

  /**
   * 调用函数根据不同的角色信息获取不同的按钮显示文字
   * @returns 角色相应按钮信息
   */
  const buttonContent = () => {
    switch (userState) {
      case 'admin':
        return '管理'
      case 'user':
        if (isSigned) {
          return '活动参加详情'
        } else {
          return '报名'
        }
      case 'judge':
        return '审批'
      case 'approver':
        return '评审'
      default:
        return '请先登录'
    }
  }

  /**
   * 调用函数将用户角色信息转换为对应编号
   * @returns 角色相应编号
   */
  const userStateToNumber = () => {
    switch (userState) {
      case 'admin':
        return 3
      case 'user':
        return 0
      case 'judge':
        return 1
      case 'approver':
        return 2
      default:
        return 0
    }
  }

  /**
   * 处理点击按钮后的反应
   */
  const handleButtonAction = () => {
    if (userState === 'user') {
      if (isSigned) {
        navigate('/activity/' + id + '/register-detail')
      } else {
        navigate('/activity/' + id + '/register')
      }
    } else if (userState === 'judge') {
      if (entranceAvailable) {
        navigate('/review/list?comId=' + id + '&page=1')
      } else {
        notification.warning({
          message: '当前比赛没有需要审核的作品',
          description: '请到审核列表查看所有需要审核的作品',
          placement: 'top',
          key: 'no-item',
          btn: btn,
        })
      }
    } else if (userState === 'approver') {
      if (entranceAvailable) {
        navigate('/review/list?comId=' + id + '&page=1')
      } else {
        notification.warning({
          message: '当前比赛没有需要评审的作品',
          description: '请到评审列表查看所有需要评审的作品',
          placement: 'top',
          key: 'no-item',
          btn: btn,
        })
      }
    } else if (userState === 'admin') {
      navigate('/activity/' + id + '/manage', { state: { competitionId: id, competitionName: competitionDetail.name } })
    }
  }

  useEffect(() => {
    // 计算锚点偏移位置并写入state
    console.log(competitionDetail)
    setTargetOffset(window.innerHeight / 2)
  }, [])

  const competitionNotice = useGetCompetitionNotice(Number(id))
  //console.log(competitionNotice)
  const competitionDetail: competitionDetailType = useGetCompetitionDetail(Number(id))

  return (
    <div>
      <TopBar activity={competitionDetail.name} />
      <div className="activity-detail-body">
        <div className="activity-detail-box">
          {isLoading ? (
            <Skeleton.Avatar shape="square" active className="cover-loading" />
          ) : (
            <img src={competitionDetail.cover} className="cover" alt="cover" />
          )}
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
                <Skeleton active loading={isLoading} paragraph={false} style={{ width: '400px' }}>
                  <div className="title">{competitionDetail.name}</div>
                </Skeleton>
                <div className="action-button">
                  {isLoading ? (
                    <Skeleton.Button shape="square" active />
                  ) : (
                    <Button type="primary" onClick={handleButtonAction}>
                      {buttonContent()}
                    </Button>
                  )}
                </div>
              </div>
              <Skeleton active loading={isLoading} title={false}>
                <div className="description" id="description">
                  {competitionDetail.introduce}
                </div>
              </Skeleton>
              <div className="announcement-section">
                <div className="notice" id="notice">
                  <div className="notice-title">消息/公告</div>
                  <Skeleton active loading={isLoading}>
                    <div className="notice-table">
                      {competitionNotice.length === 0 ? (
                        <Empty className="empty" description="暂时没有公告" />
                      ) : (
                        competitionNotice.map((item: any, index) => (
                          <CompetitionNotice
                            role={item.role}
                            key={index}
                            viewer={userStateToNumber()}
                            noticeId={item.id}
                            comId={id as unknown as number}
                            title={item.title}
                            time={item.time}
                            content={item.content}
                          />
                        ))
                      )}
                    </div>
                  </Skeleton>
                  <Skeleton active loading={isLoading}></Skeleton>
                </div>
                <div className="arrangement" id="arrangement">
                  <div className="arrangement-title">时间安排</div>
                  <Skeleton active loading={isLoading} title={false} style={{ width: '217px' }}>
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
                  </Skeleton>
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
