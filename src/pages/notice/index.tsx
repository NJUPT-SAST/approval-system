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

function Notice() {
  //活动标题
  const titleRef = useRef(null)
  //公告内容
  const contentRef = useRef(null)
  //面向对象
  const [role, setRole] = useState(-1)
  const roleChange = ({ target: { value } }: RadioChangeEvent) => {
    setRole(value)
  }
  const { pathname } = useLocation()
  //创建or编辑公告
  const [pageState] = useState(createOrEdit(pathname))
  //活动id
  const activityId: number = getActivityId(pathname)
  //公告id
  const noticeId: number = getNoticeId(pathname)

  //发布公告
  const postNotice = () => {
    let current: any = titleRef.current
    const title: string = current.input.value
    current = contentRef.current
    const content: string = current.resizableTextArea.textArea.innerHTML
    //api调用发布公告
    releaseNotice(activityId, title, content, role)
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
    let current: any = titleRef.current
    const title: string = current.input.value
    current = contentRef.current
    const content: string = current.resizableTextArea.textArea.innerHTML
    //调用api更新公告
    editNotice(noticeId, title, content, role)
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
    editNotice(noticeId, '', '', role)
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
  useEffect(() => {
    if (mounted.current || pageState === 1) {
      return
    }
    mounted.current = true
    //api获取原先比赛公告，在此基础上修改
    getCompetitionNoticeList(activityId).then((resp) => {
      if (!resp.data.success) {
        message.error('载入原先公告出错！')
        return
      }
      const dataArray: Array<noticeType> = resp.data.data
      const notice: noticeType | null = getNotice(dataArray, noticeId)
      if (!notice) {
        return
      }
      let current: any = titleRef.current
      current.input.value = notice.title
      current = contentRef.current
      current.resizableTextArea.textArea.innerHTML = notice.content
    })
  }, [])

  return (
    <div className="activity-notice">
      <TopBar activity='"挑战杯"创新创业大赛' />
      <p id="activity-notice-header">{pageState === 1 ? '发布公告' : '编辑公告'}</p>
      <div className="activity-notice-body">
        <div className="activity-notice-title">
          <p id="activity-notice-title">公告标题：</p>
          <Input ref={titleRef} placeholder="请输入公告标题" />
        </div>
        <div className="activity-notice-content">
          <p>公告内容：</p>
          <TextArea ref={contentRef} placeholder="请输入公告内容" rows={11} />
        </div>
        <div className="activity-notice-people">
          <p>面向对象：</p>
          <Radio.Group name="radiogroup" defaultValue={role} onChange={roleChange}>
            <Radio value={-1}>公开</Radio>
            <Radio value={0}>选手</Radio>
            <Radio value={1}>评委</Radio>
            <Radio value={2}>审批人</Radio>
          </Radio.Group>
        </div>
        <div className="activity-notice-operation">
          {pageState === 2 ? (
            <Button type="primary" size="small" icon={<CalendarOutlined />} onClick={saveNotice}>
              保存
            </Button>
          ) : (
            <></>
          )}
          {pageState === 1 ? (
            <Button type="primary" size="small" onClick={postNotice}>
              发布
            </Button>
          ) : (
            <></>
          )}
          {pageState === 2 ? (
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
