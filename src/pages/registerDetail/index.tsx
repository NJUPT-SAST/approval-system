import { CloudDownloadOutlined } from '@ant-design/icons'
import { loadModule } from '@sentry/utils'
import { Button, Empty, message, notification, Skeleton, Space } from 'antd'
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fileDownload } from '../../api/public'
import { getCompetitionInfo, getCompetitionSignInfo, getTeamInfo, getWorkInfo } from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

function RegisterDetail() {
  /**
   * 时间格式 普通时间戳转换时间
   * @param value 时间戳
   */
  function changeTime(value: any) {
    return new Date(value.format('YYYY-MM-DD HH:mm:ss')).getTime()
  }
  const [isLoading, setIsLoading] = useState(false)
  const [competitionInfo, setCompetitionInfo] = useState({
    minParti: 1,
    maxParti: 1,
    isTeam: true,
  })
  const [beforeSubmitTime, setBeforeSubmitTime] = useState(false)
  const [afterSubmitTime, setAfterSubmitTime] = useState(false)
  const { id } = useParams()
  const [teamInfo, setTeamInfo] = useState<{
    teamName: string
    teamMember: any[]
    teacherMember?: any[]
    teamNum?: number
  }>({
    teamName: '加载中',
    teamMember: [{ name: '加载中', code: '加载中' }],
    teacherMember: [{ name: '加载中', code: '加载中' }],
  })
  const [workData, setWorkData] = useState<
    {
      input: string
      content: string
      isFile: boolean
    }[]
  >()
  const navigate = useNavigate()
  const btn = (
    <Button
      type="primary"
      onClick={() => {
        navigate('/activity/' + id + '/work-detail')
        notification.close('no-item')
      }}
    >
      马上前往
    </Button>
  )

  const storeTeamInfo = () => {
    setIsLoading(true)
    message.loading({
      content: '🤔️ 正在获取已保存信息，请稍候',
      key: 'loading',
      duration: 50,
    })
    getCompetitionSignInfo(Number(id)).then((res) => {
      // console.log(res)
      if (!res.data.data.isTeam) {
        setCompetitionInfo({
          maxParti: 1,
          minParti: 1,
          isTeam: false,
        })
      } else {
        setCompetitionInfo({
          maxParti: res.data.data.maxTeamMembers,
          minParti: res.data.data.minTeamMembers,
          isTeam: true,
        })
      }
    })
    getTeamInfo(Number(id)).then((res) => {
      // console.log(res)
      if (res.data.errCode !== 2003) {
        setTeamInfo({
          teamName: res.data.data.teamName,
          teamMember: res.data.data.teamMember,
          teacherMember: res.data.data.teacherMember,
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
    getWorkInfo(Number(id)).then((res) => {
      // console.log(res)
      setWorkData(res.data.data)
      if (res.data.errMsg === '您还未上传作品' && !beforeSubmitTime && !afterSubmitTime) {
        notification.warning({
          message: '您还未上传项目',
          description: '请记得提交您的项目哦，否则无法正常参赛',
          placement: 'topRight',
          top: 150,
          duration: 5,
          key: 'no-item',
          btn: btn,
        })
      }
    })
  }
  console.log('workdata:', workData)
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
        const submitBeg = Date.parse(res.data.data.submitBegin)
        const submitEnd = Date.parse(res.data.data.submitEnd)
        const nowTime = Date.parse(new Date().toString())
        if (nowTime - submitBeg < 0) {
          setBeforeSubmitTime(true)
        }
        if (nowTime - submitEnd > 0) {
          setAfterSubmitTime(true)
        }
        console.log(submitBeg, submitEnd)
        setCompetitionDetail(res.data.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 100)
      })
    }, [])
    return competitionDetail
  }
  const competitionDetail = useGetCompetitionDetail(Number(id))
  console.log(beforeSubmitTime || !afterSubmitTime)
  /**
   * 判定是否为网址
   * @param str 字符串
   * @returns bool
   */
  function validURL(str: string) {
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    const objExp = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/)
    if (objExp.test(str) == true) {
      return true
    } else {
      return false
    }
  }

  /**
   * 文件下载
   * @param url 文件url
   */
  const downloadFile = (url: string) => {
    message.loading({
      content: '正在下载文件',
      duration: 500,
      key: 'downloading',
    })
    fileDownload(url)
      .then((res) => {
        const content = res.headers['content-disposition']
        console.log('content', res)
        const fileBlob = new Blob([res.data])
        const url = window.URL.createObjectURL(fileBlob)
        let filename = 'no-file'
        const name1 = content.match(/filename=(.*);/) // 获取filename的值
        const name2 = content.match(/filename\*=(.*)/) // 获取filename*的值
        // name1 = decodeURIComponent(name1)
        // name2 = decodeURIComponent(name2.substring(6)) // 下标6是UTF-8
        if (name2 !== null) {
          filename = decodeURIComponent(name2[0].substring(17))
        } else {
          if (name1 !== null) {
            filename = decodeURIComponent(name1[0])
          } else {
            filename = 'no-file'
          }
        }
        if (filename !== 'no-file') {
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          message.success({
            content: '😁 下载成功',
            key: 'downloading',
          })
        } else {
          message.error({
            content: '😞 下载发生了错误，请联系管理员',
            key: 'downloading',
          })
        }
      })
      .catch((err) => {
        message.error({
          content: '😞 下载发生了错误，请联系管理员',
          key: 'downloading',
        })
      })
  }

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
                <div className="title">比赛类型</div>
                <div className="content">{competitionInfo.isTeam ? '团队赛' : '个人赛'}</div>
              </div>
              {competitionInfo.isTeam ? (
                <div className="list-item">
                  <div className="title">队伍名称</div>
                  <div className="content">{teamInfo.teamName}</div>
                </div>
              ) : (
                <></>
              )}

              <div className="list-item">
                <div className="title">参赛人数</div>
                <div className="content">{teamInfo.teamMember.length} 人</div>
              </div>
            </div>
          </Skeleton>
          <div className="list-title-h1">参赛人员信息</div>
          <div className="list">
            <div className="list-title-h2">队长信息</div>
            <Skeleton active title={false} loading={isLoading} style={{ width: '200px', marginLeft: '2rem' }}>
              <div className="list-item">
                <div className="title">姓名</div>
                <div className="content">{teamInfo.teamMember[0].name}</div>
              </div>
              <div className="list-item">
                <div className="title">学号</div>
                <div className="content">{teamInfo.teamMember[0].code}</div>
              </div>
            </Skeleton>
          </div>
          <Skeleton active loading={isLoading} style={{ width: '200px', marginLeft: '4rem' }}>
            {teamInfo.teamMember.slice(1).map((item, index) => (
              <div className="list" key={index}>
                <div className="list-title-h2">队员{index + 1} 信息</div>
                <div className="list-item">
                  <div className="title">姓名</div>
                  <div className="content">{item.name}</div>
                </div>
                <div className="list-item">
                  <div className="title">学号</div>
                  <div className="content">{item.code}</div>
                </div>
              </div>
            ))}
          </Skeleton>
          <Skeleton active loading={isLoading} style={{ width: '200px', marginLeft: '4rem' }}>
            {teamInfo.teacherMember && teamInfo.teacherMember.map((item, index) => (
              <div className="list" key={index}>
                <div className="list-title-h2">指导老师{index + 1} 信息</div>
                <div className="list-item">
                  <div className="title">姓名</div>
                  <div className="content">{item.name}</div>
                </div>
                <div className="list-item">
                  <div className="title">工号</div>
                  <div className="content">{item.code}</div>
                </div>
              </div>
            ))}
          </Skeleton>
          <Button type="primary" disabled={isLoading} style={{ marginTop: '1rem' }} onClick={changeRegisterInfo}>
            修改报名信息
          </Button>
          <div className="space"></div>
          <div className="list-title-h1">项目提交信息</div>
          <Skeleton active loading={isLoading} style={{ width: '200px', marginLeft: '4rem' }}>
            <div className="list">
              {workData?.length === 0 || workData === null || workData === undefined || beforeSubmitTime === true ? (
                <Empty className="empty" description={!beforeSubmitTime ? '还没提交过项目哦' : '还没到项目提交时间哦'} />
              ) : (
                workData?.map((item, index) => {
                  if (item.isFile) {
                    return (
                      <div className="list-item" key={index + item.input}>
                        <div className="title">{item.input} </div>
                        <a onClick={() => downloadFile(item.content)}>
                          <div className="content">
                            <Space>
                              <CloudDownloadOutlined />
                              点击下载文件
                            </Space>
                          </div>
                        </a>
                      </div>
                    )
                  }
                  return (
                    <div className="list-item" key={index + item.input}>
                      <div className="title">{item.input} </div>
                      <div className="content">{item.content}</div>
                    </div>
                  )
                })
              )}
            </div>
          </Skeleton>
          {!beforeSubmitTime ? (
            afterSubmitTime ? (
              <>
                <Button type="primary" disabled style={{ marginTop: '1rem' }} onClick={changeWorkDetail}>
                  修改项目信息
                </Button>
                <div style={{ color: 'gray', fontSize: '12px', marginTop: '.2rem' }}>&nbsp; &nbsp;已经超过提交时间</div>
              </>
            ) : (
              <Button type="primary" disabled={isLoading} style={{ marginTop: '1rem' }} onClick={changeWorkDetail}>
                修改项目信息
              </Button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default RegisterDetail
