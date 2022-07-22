import { Button, Table, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'
import StatisticsBox from './components'
import { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

interface DataType {
  key: React.Key
  index: number
  name: string
  reviewer: string
  score: string
  evaluation: string
  choose: any
}

const columns: ColumnsType<DataType> = [
  {
    title: '序号',
    key: 'index',
    dataIndex: 'index',
    width: 30,
  },
  {
    title: '项目名称',
    key: 'name',
    dataIndex: 'name',
    width: 250,
  },
  {
    title: '评委',
    key: 'reviewer',
    dataIndex: 'reviewer',
    width: 120,
  },
  {
    title: '评分',
    key: 'score',
    dataIndex: 'score',
    width: 65,
  },
  {
    title: '评价',
    key: 'evaluation',
    dataIndex: 'evaluation',
    width: 600,
  },
  {
    title: '',
    key: 'choose',
    dataIndex: 'choose',
  },
]

function ManageDetail() {
  const [data, setData]: any = useState([])
  const [reviewer] = useState(['Max评审', 'Ming评审', 'R评审'])
  const navigate = useNavigate()
  useEffect(() => {
    if (data.length !== 0) {
      return
    }
    //生成一点造假数据×
    setData((data: DataType[]) => {
      for (let i = 0; i < 300; ++i) {
        const flag = i >= 4
        data.push({
          key: i,
          index: 114514,
          name: '随便取个名字就好了',
          reviewer: flag ? '未分配' : '随便了',
          score: flag ? '/' : '100',
          evaluation: flag ? '无' : '好耶！',
          choose: flag ? (
            <Select
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value: string) => {
                setData((data: DataType[]) => {
                  data[i].reviewer = value
                  return [...data]
                })
              }}
            >
              {reviewer.map((value, index) => {
                return (
                  <Select.Option key={index} value={value}>
                    {value}
                  </Select.Option>
                )
              })}
            </Select>
          ) : (
            <></>
          ),
        })
      }
      return [...data]
    })
  }, [])
  return (
    <div className="manage-detail">
      <TopBar activity='"挑战杯"创新创业大赛' />
      <div className="manage-detail-header">
        <p className="manage-detail-title">&quot;挑战杯&quot;创新创业大赛</p>
        <Button type="primary" size="small" id="manage-detail-set">
          设置
        </Button>
        <Button
          type="primary"
          size="small"
          id="manage-detail-notice"
          onClick={() => {
            navigate('/activity/10001/notice')
          }}
        >
          公告
        </Button>
        <Button type="primary" size="small" id="manage-detail-download-result">
          下载比赛结果
        </Button>
      </div>
      <div className="manage-detail-body">
        <div className="manage-detail-top">
          <Button type="primary" size="small" id="manage-detail-download-info">
            下载参赛信息
          </Button>
          <Button type="primary" size="small" id="manage-detail-reviewer">
            导入评委分配
          </Button>
          <span id="manage-detail-tips">限Excel文件，导入后会覆盖原有分配</span>
          <StatisticsBox name="approve" num={73} />
          <StatisticsBox name="submit" num={97} />
          <StatisticsBox name="regist" num={219} />
        </div>
        <div className="manage-detail-list">
          <Table
            columns={columns}
            dataSource={data}
            rowClassName={(record, index) => {
              //奇偶行不同样式
              return index % 2 === 0 ? 'manage-detail-list-odd' : 'manage-detail-list-even'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageDetail
