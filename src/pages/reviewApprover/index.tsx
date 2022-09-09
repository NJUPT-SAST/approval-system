import React, { useEffect, useState } from 'react'
import { Input, Table, Anchor, Button, notification } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getScoreWork } from '../../api/judge'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import { uploadWorkScoreInfo } from '../../api/judge'
import { render } from '@testing-library/react'
import Item from 'antd/lib/list/Item'

const { Link } = Anchor

const ReviewApprover: React.FC = (props) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)

  // 定义显示数据

  const { TextArea } = Input
  // 获取作品id
  const { id } = useParams()
  console.log(id)

  // 对输入数据进行限制和处理
  const [isError, setIsError] = useState(false)
  const [score, setScore] = useState<number | undefined | null>()
  const [opinion, setOpinion] = useState<string | undefined | null>()
  const [dataList, setDataList] = useState<any>({
    title: '',
    introduce: '',
    teacher: '',
    memberNum: 0,
    memberList: [],
    accessories: [],
    texts: [],
  })

  // 提交表单
  const navigate = useNavigate()
  // 处理提交事件
  const handleSubmit = () => {
    if (score! >= 0 && score! <= 100) {
      if (opinion !== null) {
        uploadWorkScoreInfo(Number(id), score!, opinion!).then(() => {
          setTimeout(() => {
            notification.info({
              message: '✅ 提交成功',
              description: '自动返回列表',
              top: 20,
              placement: 'top',
            })
          }, 100)
          window.history.back()
          //   navigate('/review/detail/' + (current + 1))
          //   if (current === total) {
          //     setTimeout(() => {
          //       notification.info({
          //         message: '😸️ 审批完成',
          //         description: '这是最后一个',
          //         top: 20,
          //         placement: 'top',
          //       })
          //     }, 300)
          //   } else if (current > total) {
          //     navigate('/review/detail/' + total)
          //   }
        })
      } else {
        setTimeout(() => {
          notification.info({
            message: 'x 提交失败',
            description: '评价不能为空',
            top: 20,
            placement: 'top',
          })
        }, 300)
      }
    } else {
      setTimeout(() => {
        notification.info({
          message: 'x 提交失败',
          description: '请输入0-100之间的数字',
          top: 20,
          placement: 'top',
        })
      }, 100)
    }
  }
  useEffect(() => {
    // 请求数据，并把列表中的成员是否为队长布尔型换为字符串
    getScoreWork(Number(id)).then((res) => {
      const result = res.data.data
      console.log(res.data.data)

      if (res.data.data !== null) {
        for (let i = 0; i < res.data.data.memberList.length; i++) {
          result.memberList[i].isCaptain = result.memberList[i].isCaptain ? '队长' : '队员'
        }
        setDataList(result)
      } else {
        notification.info({
          message: '页面加载失败',
          description: '此页面无数据',
          top: 20,
          placement: 'top',
        })
        setTimeout(() => {
          navigate('/review')
        }, 300)
      }
    })
  }, [id])
  // 定义表格数据类型和表头内容
  interface DataType {
    isCaptain: string
    name: string
    studentId: string
    grade: string
    major: string
    academy: string
    tel: number
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '职位',
      dataIndex: 'isCaptain',
      key: '1',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: '2',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: '3',
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: '4',
    },
    {
      title: '专业',
      dataIndex: 'major',
      key: '5',
    },
    {
      title: '学院',
      dataIndex: 'academy',
      key: '6',
    },
    {
      title: '电话号码',
      dataIndex: 'tel',
      key: '7',
    },
  ]

  return (
    <div className="reviewApprover-main">
      <TopBar />
      <div className="manage-content-body">
        <div className="manage-content-header">
          <h1 className="manage-content-title">评审</h1>
          <div className="submit">
            <Button type="primary" onClick={handleSubmit}>
              提交
            </Button>
          </div>
        </div>
        <div className="manage-content-main">
          <div className="message">
            <div className="navigation">
              <Anchor
                // target={() => document.getElementById('manage-content-main')}
                // onClick={(e) => e.preventDefault()}
                targetOffset={targetOffset}
              >
                <Link href="#team" title="导航" />
                <Link href="#user-information" title="参赛者信息" />
                <Link href="#show-work" title="作品展示" />
                <Link href="#attach-message" title="文字展示" />
              </Anchor>
            </div>
            <div className="content">
              <div id="team" className="item">
                <h3>队伍: {dataList.teamName}</h3>
              </div>
              <div id="user-information" className="item">
                <h3>
                  <Table<DataType> dataSource={dataList.memberList} columns={columns} />
                </h3>
              </div>
              <div id="show-work" className="item accessorices">
                {dataList.accessories.map((item: any, index: number) => {
                  return (
                    <a href={item.url} key={index}>
                      {item.file}
                    </a>
                  )
                })}
              </div>
              <div id="attach-message" className="item texts">
                {dataList.texts.map((item: any, index: number) => {
                  return (
                    <li key={index}>
                      {item.input}:{item.content}
                    </li>
                  )
                })}
              </div>
            </div>
          </div>
          {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
          <div className="judge">
            <div className="inputBox">
              <span>评分: </span>
              <Input
                className="inputbox"
                placeholder="请输入0-100之间的数"
                defaultValue={dataList.score}
                onChange={(e) => {
                  setScore(Number(e.target.value))
                  if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100) {
                    setIsError(true)
                  } else {
                    setIsError(false)
                  }
                }}
              />
            </div>
            <div className="inputBox">
              <span>评价: </span>
              <TextArea
                className="inputbox"
                rows={4}
                placeholder="请输入"
                defaultValue={dataList.opinion}
                onChange={(e) => {
                  setOpinion(e.target.value)
                }}
              />
            </div>
            {/* <Form {...formItemLayout}>
              <Form.Item label="评分">
                <Input placeholder="请输入0-100之间的数字" id="score" />
              </Form.Item>

              <Form.Item label="评价">
                <TextArea rows={3} placeholder="请输入" id="warning" />
              </Form.Item>
            </Form> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewApprover
