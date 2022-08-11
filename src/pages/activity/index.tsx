import { RollbackOutlined, SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Empty, Form, Modal, Radio, Select } from 'antd'
import Input from 'antd/lib/input'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getAllCompetitionList } from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

const { Search } = Input
const { Option } = Select
const { Meta } = Card

const useGetActivities = (): any => {
  const [activities, setActivities] = useState([])
  useEffect(() => {
    getAllCompetitionList(1, 8).then((res) => {
      console.log(res)
      setActivities(res.data.data.records)
    })
  }, [])
  return activities
}

function Activity() {
  const navigate = useNavigate()
  const [tagModelVisible, setTagModelVisible] = useState(false)
  const activities: any[] = useGetActivities()

  /**
   * 活动卡片
   * @param props  coverUrl: 封面图 | title: 比赛标题 | description: 比赛介绍 | time: 比赛时间 | author:  比赛发布者
   * @returns 包含以上信息的卡片
   */
  const ActivityCard = (props: {
    coverUrl: string
    title: string
    description: string
    time: string
    author: string
  }) => {
    const handleNavigateActivityDetail = () => {
      navigate('/activity/10001#title')
    }
    return (
      <Card
        hoverable
        className="activity-card"
        cover={<img alt="activity cover" src={props.coverUrl} height="180px" />}
        onClick={handleNavigateActivityDetail}
      >
        <Meta title={props.title} description={props.description} className="activity-content" />
        <div className="addition-content">
          <div className="time">{props.time}</div>
          <div className="author">{props.author}</div>
        </div>
      </Card>
    )
  }

  const Activities = (): JSX.Element => {
    if (activities.length === 0 || activities === undefined) {
      return <Empty style={{ margin: '0 auto' }} />
    } else {
      activities.map((item: any, index) => {
        return (
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title={item.name}
            time={item.date}
            description="hello"
            author="hello"
            key={item.id}
          />
        )
      })
    }
    console.log(activities)
    return <Empty style={{ margin: '0 auto' }} />
  }

  /**
   * 点击搜索的函数
   */
  const onSearch = () => {
    console.log('searching')
  }

  return (
    <div className="activity">
      <TopBar />
      <div className="search-body">
        <Search placeholder="搜索比赛活动或关键词" className="search-bar" onSearch={onSearch} enterButton={`搜索`} />
      </div>
      <div className="page-body">
        <div className="filter-body">
          <Form name="filter-form">
            <div className="tag-filter-body">
              <div className="filter-cover-item">
                <Button
                  className="more-button"
                  size="large"
                  onClick={() => {
                    setTagModelVisible(true)
                  }}
                >
                  更多
                </Button>
                <Modal
                  title="所有分类"
                  centered
                  visible={tagModelVisible}
                  onOk={() => {
                    setTagModelVisible(false)
                  }}
                  onCancel={() => {
                    setTagModelVisible(false)
                  }}
                  width={1000}
                >
                  <Form.Item className="model-tag-filter">
                    <Radio.Group defaultValue="all" size="large">
                      <Radio.Button value="all" className="filter-button">
                        全部
                      </Radio.Button>
                      <Radio.Button value="b" className="filter-button">
                        #科技节
                      </Radio.Button>
                      <Radio.Button value="c" className="filter-button">
                        #人文
                      </Radio.Button>
                      <Radio.Button value="d" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #互联网+
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                      <Radio.Button value="e" className="filter-button">
                        #安全知识竞赛
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Modal>
              </div>
              <Form.Item className="tag-filter">
                <Radio.Group defaultValue="all" size="large">
                  <Radio.Button value="all" className="filter-button tag-filter-button">
                    全部
                  </Radio.Button>
                  <Radio.Button value="b" className="filter-button tag-filter-button">
                    #科技节
                  </Radio.Button>
                  <Radio.Button value="c" className="filter-button tag-filter-button">
                    #人文
                  </Radio.Button>
                  <Radio.Button value="d" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #互联网+
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                  <Radio.Button value="e" className="filter-button tag-filter-button">
                    #安全知识竞赛
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item>
                <Select defaultValue="组织单位" size="large" style={{ width: 120, marginRight: '20px' }}>
                  <Option value="组织单位" disabled>
                    组织单位
                  </Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Radio.Group defaultValue="a" size="large">
                  <Radio.Button value="a" className="filter-button">
                    进行中
                  </Radio.Button>
                  <Radio.Button value="b" className="filter-button">
                    未开始
                  </Radio.Button>
                  <Radio.Button value="c" className="filter-button">
                    已结束
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="activities-body">
          <Activities />
        </div>
      </div>
    </div>
  )
}
export default Activity
