/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, notification } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { editNotice, releaseNotice, deleteCompetitionNotice } from '../../api/admin'
import TimeRanger from './timeRanger'
import TopBar from '../../components/TopBar'
import './index.scss'

// 创建 or 编辑公告，1 为创建，2 为编辑
function useMyLocation<T>() {
  return useLocation() as { state: T }
}

function Notice() {
  const navigate = useNavigate()
  // 面向对象
  const roleChange = ({ target: { value } }: RadioChangeEvent) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.role = value
      return a
    })
  }
  const { state } = useMyLocation<{
    competitionName: string
    competitionId: number
    noticeId: number
    time: string
    content: string
    title: string
    role: number
  }>()

  // 创建 or 编辑公告
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

  // 发布公告
  const postNotice = () => {
    //api调用发布公告
    releaseNotice(pageState.competitionId, pageState.title, pageState.content, pageState.role, pageState.time)
      .then((res) => {
        if (res.data.success) {
          navigate(-1)
          setTimeout(() => {
            notification.success({
              message: '😸️ 发布成功',
              top: 20,
              placement: 'top',
            })
          }, 100)
        } else {
          setTimeout(() => {
            notification.error({
              message: '😭️ 发布失败',
              description: res.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
        }
      })
      .catch((e) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 发布失败',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  // 保存公告
  const saveNotice = () => {
    console.log(pageState)
    editNotice(state.noticeId, pageState.title, pageState.content, pageState.role, pageState.time)
      .then((resp) => {
        if (resp.data.success) {
          navigate(-1)
          setTimeout(() => {
            notification.success({
              message: '😸️ 保存成功',
              top: 20,
              placement: 'top',
            })
          }, 100)
        } else {
          setTimeout(() => {
            notification.error({
              message: '😭️ 保存失败',
              description: resp.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
        }
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 保存失败',
            description: '快看看哪里出问题了',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  // 删除公告
  const deleteNotice = () => {
    //调用api删除公告
    deleteCompetitionNotice(state.noticeId)
      .then((resp) => {
        if (resp.data.success) {
          navigate(-1)
          setTimeout(() => {
            notification.success({
              message: '😸️ 删除成功',
              top: 20,
              placement: 'top',
            })
          }, 100)
        } else {
          setTimeout(() => {
            notification.error({
              message: '😭️ 删除失败',
              description: '待会儿再试试吧',
              top: 20,
              placement: 'top',
            })
          }, 100)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  /**
   * 用于 TimeRanger 子组件，将时间保存在 state 中
   *
   * @param time
   */
  const setTime = (time: string) => {
    setPageState((pre) => {
      const a = { ...pre }
      a.time = time
      return a
    })
  }

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
        a.time = moment(state.time, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
        a.role = state.role
        a.title = state.title
        return a
      })
    }
  }, [])

  return (
    <div className="activity-notice">
      <TopBar activity={state.competitionName} />
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
        <div className="activity-notice-time-ranger">
          <p>发布时间</p>
          <TimeRanger preTime={pageState.time} setTime={setTime} />
        </div>
        <div className="activity-notice-people">
          <p>面向对象：</p>
          <Radio.Group name="radiogroup" defaultValue={state.role} onChange={roleChange}>
            <Radio value={-1}>公开</Radio>
            <Radio value={0}>选手</Radio>
            <Radio value={1}>评委</Radio>
            <Radio value={2}>审核人</Radio>
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
