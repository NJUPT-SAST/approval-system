import { Button } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import './index.scss'

interface DataType {
  key: number
  index: number
  name: string
  start: string
  end: string
  des: string
  reviewer: string
  state: string
  regist: number
  submit: number
  finish: number
}

function Manage() {
  const [data, setData] = useState<Array<DataType>>([])
  const navigate = useNavigate()
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      key: 'index',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '开始日期',
      key: 'start',
      dataIndex: 'start',
    },
    {
      title: '结束日期',
      key: 'end',
      dataIndex: 'end',
    },
    {
      title: '比赛简介',
      key: 'des',
      dataIndex: 'des',
      width: 150,
    },
    {
      title: '评审人员',
      key: 'reviewer',
      dataIndex: 'reviewer',
      width: 75,
    },
    {
      title: '活动状态',
      key: 'state',
      dataIndex: 'state',
      width: 75,
    },
    {
      title: '已报名人数',
      key: 'regist',
      dataIndex: 'regist',
      width: 90,
    },
    {
      title: '已提交材料人数',
      key: 'submit',
      dataIndex: 'submit',
      width: 100,
    },
    {
      title: '已评审完毕人数',
      key: 'finish',
      dataIndex: 'finish',
      width: 100,
    },
    {
      title: '导出Excel',
      key: 'excel',
      dataIndex: '',
      width: 75,
      render: () => (
        <Button type="link" size="small">
          导出
        </Button>
      ),
    },
    {
      title: '发布公告',
      key: 'notice',
      dataIndex: '',
      width: 75,
      render: () => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            navigate('/activity/10001/notice')
          }}
        >
          发布公告
        </Button>
      ),
    },
    {
      title: '修改活动',
      key: 'modify',
      dataIndex: '',
      width: 75,
      render: () => (
        <Button
          type="link"
          size="small"
          onClick={() => {
            navigate('/activity/10001/manage')
          }}
        >
          编辑
        </Button>
      ),
    },
  ]

  useEffect(() => {
    if (data.length !== 0) {
      return
    }
    setData((data: DataType[]) => {
      //先自己生成一点测试数据用,之后用api获取
      for (let i = 0; i < 45; ++i) {
        data.push({
          key: i,
          index: 114514,
          name: '名字什么的随便就好了',
          start: '2022-07-14',
          end: '2022-07-25',
          des: '就随便写点吧',
          reviewer: '随便谁吧',
          state: '进行中',
          regist: 1,
          submit: 1,
          finish: 1,
        })
      }
      return [...data]
    })
  }, [])

  return (
    <div>
      <TopBar />
      <div className="manage-header">
        <h1 id="manage-header-title">活动管理</h1>
        <Button type="primary" size="small">
          创建比赛
        </Button>
      </div>
      <div className="manage-body">
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={(record, index) => {
            //奇偶行不同样式
            return index % 2 === 0 ? 'manage-list-odd' : 'manage-list-even'
          }}
        />
      </div>
    </div>
  )
}

export default Manage
