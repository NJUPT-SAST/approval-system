import React, { useEffect, useState } from 'react'
import { Anchor, Button, Pagination, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { getJudgeWorkInfo } from '../../api/judge'
// import type { ColumnsType } from 'antd/es/table'
import './index.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { uploadWorkJudgeInfo } from '../../api/judge'

const { Link } = Anchor

const ReviewJudge: React.FC = (props) => {
  const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined)
  // 获取作品id
  const { search } = useLocation()

  const [id, setId] = useState<any>(Number(search.slice(1).split('&')[0].split('=')[1]))
  const [page, setPage] = useState<any>()
  const [isPass, setIsPass] = useState(false)
  const [opinion, setOpinion] = useState('')

  const [dataList, setDataList] = useState({
    title: '',
    introduce: '',
    memberList: [],
    accessories: '',
    teacher: '',
  })

  console.log(props)
  const total = Number(localStorage.getItem('listTotal'))

  // 提交
  const navigate = useNavigate()
  const handleSubmit = () => {
    uploadWorkJudgeInfo(id, isPass!, opinion!).then(() => {
      console.log('提交成功')
      if (id === total) {
        alert('这是最后一页')
        return
      } else if (id > total) {
        navigate('/review/detail?id=' + total)
        setPage(total)
      }
      navigate('/review/detail?id=' + (id + 1))
    })
    setPage(Number(search.slice(1).split('&')[0].split('=')[1]))
  }

  // 改变页码
  const changePage = (page: any) => {
    setId(page)
  }

  useEffect(() => {
    // 请求数据，并把列表中的成员是否为队长布尔型换为字符串
    getJudgeWorkInfo(id).then((res) => {
      const result = res.data.data
      for (let i = 0; i < res.data.data.memberList.length; i++) {
        result.memberList[i].isCaptain = result.memberList[i].isCaptain ? '队长' : '队员'
      }
      setDataList(result)
      console.log(result)
    })
  }, [id])
  // document.querySelector('.navigation').addEventListener('scroll', handleScroll)
  return (
    <div className="manage-content-body">
      <div className="manage-content-header">
        <h1 className="manage-content-title">审批</h1>
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
              {dataList.memberList.map((item: any, index: any) => (
                <div key={index}>
                  <h2>参赛者信息</h2>
                  <li>
                    <span>姓名:</span>
                    {item.name}
                  </li>
                  <li>
                    <span>学号:</span>
                    {item.studentId}
                  </li>
                  <li>
                    <span>专业:</span>
                    {item.major}
                  </li>
                  <li>
                    <span>学院:</span>
                    {item.academy}
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
              <h2>指导老师：{dataList.teacher}</h2>
              <h3>{dataList.introduce}</h3>
              <a href="">{dataList.accessories}</a>
            </div>
          </div>
        </div>
        {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
        <div className="judge">
          <div className="inputBox">
            <Radio.Group
              onChange={(e) => {
                setIsPass(e.target.value === 'pass' ? true : false)
              }}
            >
              <span style={{ marginRight: '10px', marginLeft: '60px' }}>审批结果: </span>
              <Radio value="pass">通过</Radio>
              <Radio value="nopass">未通过</Radio>
            </Radio.Group>
          </div>
          <div className="inputBox">
            <span style={{ marginLeft: '90px', marginRight: '10px' }}>意见: </span>
            <textarea
              className="inputbox"
              style={{ height: '80px' }}
              placeholder="未通过原因"
              onChange={(e) => {
                setOpinion(e.target.value)
              }}
            ></textarea>
          </div>
          <div>
            <Pagination defaultCurrent={1} total={50} onChange={changePage} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewJudge
