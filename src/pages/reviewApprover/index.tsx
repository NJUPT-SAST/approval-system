import React, { useEffect, useState } from 'react'
import { Form, Input, Table, Anchor, Button, Pagination } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getScoreWork } from '../../api/judge'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import { uploadWorkScoreInfo } from '../../api/judge'

const { Link } = Anchor

const ReviewApprover: React.FC = (props) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)

  // 定义显示数据
  const total = Number(localStorage.getItem('listTotal'))

  const [score, setScore] = useState<number | undefined | null>()
  const [opinion, setOpinion] = useState<string | undefined | null>()
  const [dataList, setDataList] = useState<any>({
    title: '',
    introduce: '',
    teacher: '',
    memberNum: 0,
    memberList: [],
    accessories: '',
  })
  // 获取作品id
  const { search } = useLocation()
  const id = Number(search.slice(1).split('&')[0].split('=')[1])

  // 提交表单
  const navigate = useNavigate()
  const handleSubmit = () => {
    if (score! >= 0 && score! <= 100) {
      uploadWorkScoreInfo(id, score!, opinion!).then(() => {
        console.log('提交成功')
        if (id === total) {
          alert('这是最后一页')
          return
        } else if (id > total) {
          navigate('/review/detail?id=' + (id + 1))
        }
      })
    } else {
      alert('请输入0-100之间得数')
    }
  }
  useEffect(() => {
    // 请求数据，并把列表中的成员是否为队长布尔型换为字符串
    getScoreWork(id).then((res) => {
      const result = res.data.data
      for (let i = 0; i < res.data.data.memberList.length; i++) {
        result.memberList[i].isCaptain = result.memberList[i].isCaptain ? '队长' : '队员'
      }
      setDataList(result)
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
    <div className="manage">
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
                targetOffset={targetOffset}
                getContainer={() => document.querySelector('.manage-content-main') as HTMLElement}
              >
                <Link href="#team" title="导航" />
                <Link href="#user-information" title="参赛者信息" />
                <Link href="#show-work" title="作品展示" />
                <Link href="#attach-message" title="文字展示" />
              </Anchor>
            </div>
            <div className="content">
              <div id="team" className="item">
                <h3>队伍: {dataList.title}</h3>
              </div>
              <div id="user-information" className="item">
                <h3>
                  <Table<DataType> dataSource={dataList.memberList} columns={columns} />
                </h3>
              </div>
              <div id="show-work" className="item">
                <h3>{dataList.introduce}</h3>
              </div>
              <div id="attach-message" className="item">
                <h3>{dataList.accessories}</h3>
                <a href="javascript;">附件</a>
              </div>
            </div>
          </div>
          {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
          <div className="judge">
            <div className="inputBox">
              <span>评分: </span>
              <input
                className="inputbox"
                type="text"
                placeholder="请输入"
                defaultValue={dataList.score}
                onChange={(e) => {
                  setScore(Number(e.target.value))
                }}
              ></input>
            </div>
            <div className="inputBox">
              <span>评价: </span>
              <textarea
                className="inputbox"
                style={{ height: '80px' }}
                placeholder="请输入"
                defaultValue={dataList.opinion}
                onChange={(e) => {
                  setOpinion(e.target.value)
                }}
              ></textarea>
            </div>
            {/* <Form {...formItemLayout}>
              <Form.Item label="评分">
                <Input placeholder="请输入0-100之间的数字" id="score" />
              </Form.Item>

              <Form.Item label="评价">
                <TextArea rows={3} placeholder="请输入" id="warning" />
              </Form.Item>
            </Form> */}
            <div>
              <Pagination defaultCurrent={id} total={total} showSizeChanger showQuickJumper />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewApprover
