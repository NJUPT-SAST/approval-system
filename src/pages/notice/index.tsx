/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

const getActivityId = (pathname: string): number => {
  const idArray: RegExpMatchArray | null = pathname.match(/(\d+)/g)
  return parseInt(idArray ? idArray[0] : '1')
}

//公告对象类型
interface noticeType {
  id: number
  title: string
  content: string
  role: number
}

const getNoticeStorageIndex = (noticeArray: Array<noticeType>, id: number): number => {
  let index = 0
  for (index = 0; index < noticeArray.length; index++) {
    if (noticeArray[index].id === id) {
      return index
    }
  }
  return index
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
  const [role, setRole] = useState(1)
  const roleChange = ({ target: { value } }: RadioChangeEvent) => {
    setRole(value)
  }
  const { pathname } = useLocation()
  //创建or编辑公告
  const [pageState] = useState(createOrEdit(pathname))
  //活动id
  const id: number = getActivityId(pathname)
  //本地已保存所有公告（所有活动）
  const noticeAlreadyStoredJson: string | null = localStorage.getItem('notice')
  //所有已保存公告的Array
  const noticeAlreadyStoredArray: Array<noticeType> = useMemo((): Array<noticeType> => {
    return noticeAlreadyStoredJson ? JSON.parse(noticeAlreadyStoredJson) : []
  }, [noticeAlreadyStoredJson])
  //当前活动在所有活动Array中的下标
  const noticeIndex: number = useMemo((): number => {
    return getNoticeStorageIndex(noticeAlreadyStoredArray, id)
  }, [id, noticeAlreadyStoredArray])

  //保存公告到本地
  const saveNotice = () => {
    let current: any = titleRef.current
    const title: string = current.input.value
    current = contentRef.current
    const content: string = current.resizableTextArea.textArea.innerHTML
    const noticeNow: noticeType = { id: id, title: title, content: content, role: role }
    //保存公告到对应下标
    noticeAlreadyStoredArray[noticeIndex] = noticeNow
    localStorage.setItem('notice', JSON.stringify(noticeAlreadyStoredArray))
    message.success('保存成功！')
  }

  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) {
      return
    }
    mounted.current = true
    const noticeAlreadyStored: noticeType = noticeAlreadyStoredArray[noticeIndex]
      ? noticeAlreadyStoredArray[noticeIndex]
      : { id: id, title: '', content: '', role: role }
    let current: any = titleRef.current
    //从保存的公告中读取
    current.input.value = noticeAlreadyStored.title
    current = contentRef.current
    current.resizableTextArea.textArea.innerHTML = noticeAlreadyStored.content
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
          {/* //todo 更改role的编号 */}
          <Radio.Group name="radiogroup" defaultValue={role} onChange={roleChange}>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>选手</Radio>
            <Radio value={3}>评委</Radio>
            <Radio value={4}>审批人</Radio>
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
            <Button type="primary" size="small">
              发布
            </Button>
          ) : (
            <></>
          )}
          {pageState === 2 ? (
            <Button type="primary" size="small">
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
