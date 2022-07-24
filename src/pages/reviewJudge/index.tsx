import React, { useEffect, useState } from 'react'
import { Table, Anchor, Button, Pagination } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './index.scss'

const { Link } = Anchor

interface DataType {
  posts: string
  name: string
  stuid: string
  grade: string
  major: string
  academy: string
}
const columns: ColumnsType<DataType> = [
  {
    title: '职位',
    dataIndex: 'posts',
    key: 'posts',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '学号',
    dataIndex: 'stuid',
    key: 'stuid',
  },
  {
    title: '年级',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: '专业',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: '学院',
    dataIndex: 'academy',
    key: 'academy',
  },
]

const data: DataType[] = [
  {
    posts: '队长',
    name: 'John Brown',
    stuid: 'B122323',
    grade: '大一',
    major: '计算机科学与技术',
    academy: '计软网安院',
  },
  {
    posts: '队员',
    name: 'John Brown',
    stuid: 'B122323',
    grade: '大一',
    major: '计算机科学与技术',
    academy: '计软网安院',
  },
  {
    posts: '队员',
    name: 'John Brown',
    stuid: 'B122323',
    grade: '大一',
    major: '计算机科学与技术',
    academy: '计软网安院',
  },
  {
    posts: '队员',
    name: 'John Brown',
    stuid: 'B122323',
    grade: '大一',
    major: '计算机科学与技术',
    academy: '计软网安院',
  },
]

const ReviewJudge: React.FC = (props) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)

  useEffect(() => {
    setTargetOffset(window.innerHeight / 2)
  }, [])
  return (
    <div className="manage-content-body">
      <div className="manage-content-header">
        <h1 className="manage-content-title">评审</h1>
        <div className="submit">
          <Button type="primary">提交</Button>
        </div>
      </div>
      <div className="manage-content-main">
        <div className="message">
          <div className="navigation">
            <Anchor
              targetOffset={targetOffset}
              getContainer={() => document.querySelector('.navigation') as HTMLElement}
            >
              <Link href="#team" title="导航" />
              <Link href="#user-information" title="参赛者信息" />
              <Link href="#show-work" title="作品展示" />
              <Link href="#attach-message" title="文字展示" />
            </Anchor>
          </div>
          <div className="content">
            <div id="team" className="item">
              <h3>队伍: {'啊对对对队'}</h3>
            </div>
            <div id="user-information" className="item">
              <h3>
                <Table dataSource={data} columns={columns} />
              </h3>
            </div>
            <div id="show-work" className="item">
              <h3>
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
              </h3>
            </div>
            <div id="attach-message" className="item">
              <h3>
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
                占位符
                <br />
              </h3>
              <a href="javascript;">附件</a>
            </div>
          </div>
        </div>
        {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
        <div className="judge">
          <div className="inputBox">
            <span>评分: </span>
            <input className="inputbox" type="text" placeholder="请输入"></input>
          </div>
          <div className="inputBox">
            <span>评价: </span>
            <textarea className="inputbox" style={{ height: '80px' }} placeholder="请输入"></textarea>
          </div>
          <div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewJudge
