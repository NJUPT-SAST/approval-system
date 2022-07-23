import { Button, Pagination } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

//一页最多10个
const PageMaxNum = 10

function Manage() {
  //先自己生成一点测试数据用,之后用api获取
  const data = []
  for (let i = 0; i < 45; ++i) {
    data.push({
      id: i,
      name: '名字什么的随便就好了嘛',
      start: '2022-07-14',
      end: '2022-07-25',
      des: '不想写简介(好想摸鱼好想睡觉×',
      review: '随便谁吧',
      state: '进行中',
      regist: 1,
      submit: 1,
      finish: 1,
    })
  }
  //state为当前所在页数和数据量
  const [pageNow, setPageNow] = useState([1, Math.min(data.length, PageMaxNum)])
  const navigate = useNavigate()
  return (
    <div className="manage">
      <TopBar />
      <div className="manage-body">
        <div className="manage-top">
          <p id="manage-title">活动管理</p>
          <Button
            type="primary"
            className="match-create"
            onClick={() => {
              navigate('/manage/create')
            }}
          >
            创建比赛
          </Button>
        </div>
        <div className="match-all">
          <ul className="match-header">
            <li id="match-idx">序号</li>
            <li id="match-name">名称</li>
            <li id="match-starttime">开始日期</li>
            <li id="match-endtime">结束日期</li>
            <li id="match-des">比赛简介</li>
            <li id="match-review">评审人员</li>
            <li id="match-state">活动状态</li>
            <li id="match-regist">已报名人数</li>
            <li id="match-submit">已提交材料人数</li>
            <li id="match-finish">已评审完毕人数</li>
            <li id="match-excel">导出Excel</li>
            <li id="match-notice">发布公告</li>
            <li id="match-revise">修改活动</li>
          </ul>
          <hr className="divider" />
          {/* 通过数据生成列表 */}
          {
            //根据页数获取当前页面的数据
            data.slice(PageMaxNum * (pageNow[0] - 1), PageMaxNum * (pageNow[0] - 1) + pageNow[1]).map((item, index) => {
              //第奇数个背景为灰，偶数个为白
              const idx = (index + 1) % 2
              return (
                <ul className={`item-${idx}`} key={PageMaxNum * (pageNow[0] - 1) + index}>
                  <li className="item-idx">{PageMaxNum * (pageNow[0] - 1) + index + 1}</li>
                  <li className="item-name" title={item.name}>
                    {item.name}
                  </li>
                  <li className="item-start">{item.start}</li>
                  <li className="item-end">{item.end}</li>
                  <li className="item-des">{item.des}</li>
                  <li className="item-review">{item.review}</li>
                  <li className="item-state">{item.state}</li>
                  <li className="item-regist">{item.regist}</li>
                  <li className="item-submit">{item.submit}</li>
                  <li className="item-finish">{item.finish}</li>
                  <li className="item-excel">
                    <Button type="link" size="small">
                      导出
                    </Button>
                  </li>
                  <li className="item-notice">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        navigate('/activity/10001/notice')
                      }}
                    >
                      发布公告
                    </Button>
                  </li>
                  <li className="item-revise">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        navigate('/activity/10001/manage')
                      }}
                    >
                      编辑
                    </Button>
                  </li>
                </ul>
              )
            })
          }
          <Pagination
            defaultCurrent={1}
            total={data.length}
            onChange={(page, pageSize) => {
              setPageNow([page, pageSize])
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Manage
