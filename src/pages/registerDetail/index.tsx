import { Button, message, Skeleton } from 'antd'
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompetitionInfo, getTeamInfo } from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

function RegisterDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const [teamInfo, setTeamInfo] = useState<{
    teamName: string
    teamMember: any[]
    teamNum?: number
  }>({
    teamName: '加载中',
    teamMember: [{ name: '加载中', code: '加载中' }],
  })
  const navigate = useNavigate()

  const storeTeamInfo = () => {
    setIsLoading(true)
    message.loading({
      content: '🤔️ 正在获取已保存信息，请稍候',
      key: 'loading',
      duration: 50,
    })
    getTeamInfo(Number(id)).then((res) => {
      // console.log(res)
      if (res.data.errCode !== 2003) {
        setTeamInfo({
          teamName: res.data.data.teamName,
          teamMember: res.data.data.teamMember,
          teamNum: res.data.data.teamMember.length,
        })
        setIsLoading(false)
        message.success({
          content: '😸️ 信息加载成功',
          key: 'loading',
        })
      } else if (res.data.errMsg === '您还未报名该比赛') {
        navigate('/activity/' + id + '/register')
      } else {
        setIsLoading(false)
        message.error({
          content: '🙀️ 信息加载错误，请联系管理员',
          key: 'loading',
        })
      }
    })
  }

  /**
   * 获取比赛的详细信息
   * @param id 比赛的id
   * @returns 返回比赛详细信息的state
   */
  const useGetCompetitionDetail = (id: number) => {
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
    }, [])
    return competitionDetail
  }
  const competitionDetail = useGetCompetitionDetail(Number(id))

  const changeRegisterInfo = () => {
    navigate('/activity/' + id + '/register')
  }

  const changeWorkDetail = () => {
    navigate('/activity/' + id + '/work-detail')
  }

  useLayoutEffect(() => {
    storeTeamInfo()
  }, [])

  return (
    <Fragment>
      <TopBar activity={competitionDetail.name} />
      <div className="result-detail-body">
        <div className="title">报名参加详情</div>
        <div className="result-detail-box">
          <div className="list-title-h1">队伍信息</div>
          <Skeleton active title={false} loading={isLoading} style={{ width: '200px', marginLeft: '2rem' }}>
            <div className="list">
              <div className="list-item">
                <div className="title">队伍名称: </div>
                <div className="content">{teamInfo.teamName}</div>
              </div>
              <div className="list-item">
                <div className="title">参赛人数: </div>
                <div className="content">{teamInfo.teamMember.length} 人</div>
              </div>
            </div>
          </Skeleton>
          <div className="list-title-h1">参赛人员信息</div>
          <div className="list">
            <div className="list-title-h2">队长信息</div>
            <Skeleton active title={false} loading={isLoading} style={{ width: '200px', marginLeft: '2rem' }}>
              <div className="list-item">
                <div className="title">姓名: </div>
                <div className="content">{teamInfo.teamMember[0].name}</div>
              </div>
              <div className="list-item">
                <div className="title">学号: </div>
                <div className="content">{teamInfo.teamMember[0].code}</div>
              </div>
            </Skeleton>
          </div>
          <Skeleton active loading={isLoading} style={{ width: '200px', marginLeft: '4rem' }}>
            {teamInfo.teamMember.slice(1).map((item, index) => (
              <div className="list" key={index}>
                <div className="list-title-h2">队员{index + 1} 信息</div>
                <div className="list-item">
                  <div className="title">姓名: </div>
                  <div className="content">{item.name}</div>
                </div>
                <div className="list-item">
                  <div className="title">学号: </div>
                  <div className="content">{item.code}</div>
                </div>
              </div>
            ))}
          </Skeleton>
          <Button type="primary" style={{ marginTop: '1rem' }} onClick={changeRegisterInfo}>
            修改报名信息
          </Button>
          <div className="space"></div>
          <div className="list-title-h1">作品提交信息</div>
          <Skeleton active loading={isLoading} style={{ width: '200px', marginLeft: '4rem' }}>
            <div className="list">
              <div className="list-item">
                <div className="title">附件1: </div>
                <div className="content"></div>
              </div>
            </div>
          </Skeleton>
          <Button type="primary" style={{ marginTop: '1rem' }} onClick={changeWorkDetail}>
            修改作品信息
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default RegisterDetail
