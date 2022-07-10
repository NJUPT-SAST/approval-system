import { RollbackOutlined, SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Form, Radio, Select } from 'antd'
import Input from 'antd/lib/input'
import React, { Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

const { Search } = Input
const { Option } = Select
const { Meta } = Card

function Activity() {
  const navigate = useNavigate()
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
          <Form name="filter-from">
            <Form.Item>
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
              </Radio.Group>
            </Form.Item>

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
                  <Radio.Button value="a" className="filterButton">
                    Hangzhou
                  </Radio.Button>
                  <Radio.Button value="b" className="filterButton">
                    Shanghai
                  </Radio.Button>
                  <Radio.Button value="c" className="filterButton">
                    Beijing
                  </Radio.Button>
                  <Radio.Button value="d" className="filterButton">
                    Chengdu
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="activities-body">
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
          <ActivityCard
            coverUrl="https://img.js.design/assets/smartFill/img432164da758808.jpg"
            title="“创新杯”创新创业大赛"
            description="挑战自我，创新突破，挑战杯有你更精彩!截止报名时间为3月25日，报名请加QQ群来参与吧！"
            time="2022/07/10"
            author="计软网安学院"
          />
        </div>
      </div>
    </div>
  )
}
export default Activity
