import React, { useEffect, useState } from 'react'
import { Anchor, Button, Pagination, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
// import type { ColumnsType } from 'antd/es/table'
import './index.scss'

const { Link } = Anchor
const udata = [
  { name: '小林', score: 'B21030122', profess: '计算机科学与技术', unity: '计软网安院', grade: '大一', tel: 123232 },
  { name: '小林', score: 'B21030122', profess: '计算机科学与技术', unity: '计软网安院', grade: '大一', tel: 22656 },
  { name: '小林', score: 'B21030122', profess: '计算机科学与技术', unity: '计软网安院', grade: '大一', tel: 262626 },
]
const ReviewApprover: React.FC = (props) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)
  // let handleScroll = function () {
  //   console.log('111')
  // }
  console.log(props)

  // 单选框
  const [value, setValue] = useState(1)
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  useEffect(() => {
    setTargetOffset(window.innerHeight / 2)

    // document.querySelector('.navigation').addEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="manage-content-body">
      <div className="manage-content-header">
        <h1 className="manage-content-title">审批</h1>
        <div className="submit">
          <Button type="primary">提交</Button>
        </div>
      </div>
      <div className="manage-content-main">
        <div className="message">
          <div className="navigation">
            <Anchor
              targetOffset={targetOffset}
              onClick={(e) => e.preventDefault()}
              // getContainer={() => document.querySelector('.message')}
            >
              <Link href="#user-information" title="参赛者信息" />
              <Link href="#show-work" title="作品展示" />
            </Anchor>
          </div>
          <div className="content">
            <ul id="user-information" className="item udata">
              {udata.map((item, index) => (
                <div key={index}>
                  <h2>参赛者信息</h2>
                  <li>
                    <span>姓名:</span>
                    {item.name}
                  </li>
                  <li>
                    <span>学号:</span>
                    {item.score}
                  </li>
                  <li>
                    <span>专业:</span>
                    {item.profess}
                  </li>
                  <li>
                    <span>学院:</span>
                    {item.unity}
                  </li>
                  <li>
                    <span>年级:</span>
                    {item.grade}
                  </li>
                  <li>
                    <span>电话:</span>
                    {item.tel}
                  </li>
                </div>
              ))}
            </ul>
            <div id="show-work" className="item">
              <h3>
                作品展示 占位符
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
          </div>
        </div>
        {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
        <div className="judge">
          <div className="inputBox">
            <Radio.Group onChange={onChange} value={value}>
              <span style={{ marginRight: '10px', marginLeft: '60px' }}>审批结果: </span>
              <Radio value={1}>通过</Radio>
              <Radio value={2}>未通过</Radio>
            </Radio.Group>
          </div>
          <div className="inputBox">
            <span style={{ marginLeft: '90px', marginRight: '10px' }}>意见: </span>
            <textarea className="inputbox" style={{ height: '80px' }} placeholder="未通过原因"></textarea>
          </div>
          <div>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewApprover
