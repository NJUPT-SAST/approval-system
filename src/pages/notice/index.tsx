/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { editNotice, releaseNotice } from '../../api/admin'
import { getCompetitionNoticeList } from '../../api/public'
import TopBar from '../../components/TopBar'
import './index.scss'

const getActivityId = (pathname: string): number => {
  const idArray: RegExpMatchArray | null = pathname.match(/(\d+)/g)
  return parseInt(idArray ? idArray[0] : '1')
}

const getNoticeId = (pathname: string): number => {
  const idArray: RegExpMatchArray | null = pathname.match(/(\d+)/g)
  return parseInt(idArray ? idArray[1] : '-1')
}

//公告对象类型
interface noticeType {
  id: number
  title: string
  content: string
  time: string
}

//获取api返回公告列表中对应id的公告内容
const getNotice = (noticeArray: Array<noticeType>, id: number): noticeType | null => {
  for (let index = 0; index < noticeArray.length; index++) {
    if (noticeArray[index].id === id) {
      return noticeArray[index]
    }
  }
  return null
}

//创建or编辑公告，1为创建，2为编辑
const createOrEdit = (pathname: string): number => {
  return pathname.startsWith('/manage') ? 1 : 2
}
function useMyLocation<T>() {
  return useLocation() as { state: T }
}

function Notice() {
  //活动标题
  const titleRef = useRef(null)
  //公告内容
  const contentRef = useRef(null)
  //面向对象
  const roleChange = ({ target: { value } }: RadioChangeEvent) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.role = value
      return a
    })
  }
  const { pathname } = useLocation()
  const { state } = useMyLocation<{
    competitionId: number
    noticeId: number
    time: string
    content: string
    title: string
    role: number
  }>()
  const [data, setData] = useState(state)
  //创建or编辑公告
  const [createOrEdit, setCreateOrEdit] = useState<number>(1)
  const [pageState, setPageState] = useState<{
    competitionId: number
    time: string
    content: string
    title: string
    role: number
  }>({
    competitionId: state.competitionId,
    time: '',
    content: '',
    title: '',
    role: -1,
  })
  // const [pageState] = useState(createOrEdit(pathname))
  //活动id
  const activityId: number = getActivityId(pathname)
  //公告id
  const noticeId: number = getNoticeId(pathname)

  //发布公告
  const postNotice = () => {
    // let current: any = titleRef.current
    // const title: string = current.input.value
    // current = contentRef.current
    // const content: string = current.resizableTextArea.textArea.innerHTML
    //api调用发布公告
    console.log(pageState)
    releaseNotice(pageState.competitionId, pageState.title, pageState.content, pageState.role, pageState.time)
      .then((resp) => {
        if (resp.data.success) {
          message.success('发布成功！')
        } else {
          message.error('发布失败！')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  //保存公告
  const saveNotice = () => {
    // let current: any = titleRef.current
    // const title: string = current.input.value
    // current = contentRef.current
    // const content: string = current.resizableTextArea.textArea.innerHTML
    // //调用api更新公告
    console.log(pageState)
    editNotice(state.noticeId, pageState.title, pageState.content, pageState.role, pageState.time)
      .then((resp) => {
        if (resp.data.success) {
          message.success('公告更新成功！')
        } else {
          message.success('公告更新失败！')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteNotice = () => {
    //调用api删除公告
    editNotice(state.noticeId, '', '', pageState.role)
      .then((resp) => {
        if (resp.data.success) {
          message.success('公告更新成功！')
        } else {
          message.success('公告更新失败！')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const mounted = useRef(false)

  // useEffect(() => {
  //   if (mounted.current || pageState === 1) {
  //     return
  //   }
  //   mounted.current = true
  //   //api获取原先比赛公告，在此基础上修改
  //   getCompetitionNoticeList(activityId).then((resp) => {
  //     if (!resp.data.success) {
  //       message.error('载入原先公告出错！')
  //       return
  //     }
  //     const dataArray: Array<noticeType> = resp.data.data
  //     const notice: noticeType | null = getNotice(dataArray, noticeId)
  //     if (!notice) {
  //       return
  //     }
  //     let current: any = titleRef.current
  //     current.input.value = notice.title
  //     current = contentRef.current
  //     current.resizableTextArea.textArea.innerHTML = notice.content
  //   })
  // }, [])

  useEffect(() => {
    setPageState((pre) => {
      const a = { ...pre }
      a.competitionId = state.competitionId
      return a
    })
    if (state.noticeId) {
      setCreateOrEdit(2)
      console.log(state)
      setPageState((pre) => {
        const a = { ...pre }
        a.content = state.content
        a.time = state.time
        a.title = state.title
        return a
      })
    }
  }, [])
  return (
    <div className="activity-notice">
      <TopBar activity='"挑战杯"创新创业大赛' />
      <p id="activity-notice-header">{createOrEdit === 1 ? '发布公告' : '编辑公告'}</p>
      <div className="activity-notice-body">
        <div className="activity-notice-title">
          <p id="activity-notice-title">公告标题：</p>
          <Input
            value={pageState.title}
            placeholder="请输入公告标题"
            onChange={(e) => {
              setPageState((pre) => {
                const a = { ...pre }
                a.title = e.target.value
                return a
              })
            }}
          />
        </div>
        <div className="activity-notice-content">
          <p>公告内容：</p>
          <TextArea
            value={pageState.content}
            placeholder="请输入公告内容"
            rows={11}
            onChange={(e) => {
              setPageState((pre) => {
                const a = { ...pre }
                a.content = e.target.value
                return a
              })
            }}
          />
        </div>
        <div className="activity-notice-people">
          <p>面向对象：</p>
          <Radio.Group name="radiogroup" defaultValue={pageState.role} onChange={roleChange}>
            <Radio value={-1}>公开</Radio>
            <Radio value={0}>选手</Radio>
            <Radio value={1}>评委</Radio>
            <Radio value={2}>审批人</Radio>
          </Radio.Group>
        </div>
        <div className="activity-notice-operation">
          {createOrEdit === 2 ? (
            <Button type="primary" size="small" icon={<CalendarOutlined />} onClick={saveNotice}>
              保存
            </Button>
          ) : (
            <></>
          )}
          {createOrEdit === 1 ? (
            <Button type="primary" size="small" onClick={postNotice}>
              发布
            </Button>
          ) : (
            <></>
          )}
          {createOrEdit === 2 ? (
            <Button type="primary" size="small" onClick={deleteNotice}>
              删除
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notice
