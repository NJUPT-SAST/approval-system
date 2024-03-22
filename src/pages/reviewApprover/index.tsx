import React, { useEffect, useState } from 'react'
import { Input, Table, Anchor, Button, notification, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { getScoreWork } from '../../api/judge'
import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import { uploadWorkScoreInfo } from '../../api/judge'
// import Pdf from './components/index'
import { fileDownload } from '../../api/public'
import { DownloadOutlined } from '@ant-design/icons'

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
  // pdf是否隐藏
  const [show, setShow] = useState(false)

  // 提交表单
  const navigate = useNavigate()
  /**
   * 文件下载
   * @param url 文件url
   */
  const downloadFile = (url: string) => {
    message.loading({
      content: '正在下载文件',
      duration: 500,
      key: 'downloading',
    })
    fileDownload(url)
      .then((res) => {
        const content = res.headers['content-disposition']
        console.log('content', res)
        const fileBlob = new Blob([res.data])
        const url = window.URL.createObjectURL(fileBlob)
        let filename = 'no-file'
        const name1 = content.match(/filename=(.*);/) // 获取filename的值
        const name2 = content.match(/filename\*=(.*)/) // 获取filename*的值
        // name1 = decodeURIComponent(name1)
        // name2 = decodeURIComponent(name2.substring(6)) // 下标6是UTF-8
        if (name2 !== null) {
          filename = decodeURIComponent(name2[0].substring(17))
        } else {
          if (name1 !== null) {
            filename = decodeURIComponent(name1[0])
          } else {
            filename = 'no-file'
          }
        }
        if (filename !== 'no-file') {
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
          message.success({
            content: '😁 下载成功',
            key: 'downloading',
          })
        } else {
          message.error({
            content: '😞 下载发生了错误，请联系管理员',
            key: 'downloading',
          })
        }
      })
      .catch((err) => {
        message.error({
          content: '😞 下载发生了错误，请联系管理员',
          key: 'downloading',
        })
      })
  }
  // 处理提交事件
  const handleSubmit = () => {
    if (score === null || score === undefined || score <= 0 || score <= 100) {
      setTimeout(() => {
        notification.info({
          message: 'x 提交失败',
          description: '请输入0-100之间的数字',
          top: 20,
          placement: 'top',
        })
      }, 100)
      return
    }
    if (opinion === null || opinion === undefined) {
      setOpinion("")
    }
    uploadWorkScoreInfo(Number(id), score, String(opinion)).then(() => {
      notification.info({
        message: '✅ 提交成功',
        description: '自动返回列表',
        top: 20,
        placement: 'top',
      })
      setTimeout(() => {
        window.history.back()
      }, 100)

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
  }
  useEffect(() => {
    // 请求数据，并把列表中的成员是否为队长布尔型换为字符串
    getScoreWork(Number(id)).then((res) => {
      const result = res.data.data

      if (res.data.data !== null) {
        result.memberList.unshift(res.data.data.captain)
        // console.log(result.memberList)

        for (let i = 0; i < res.data.data.memberList.length; i++) {
          result.memberList[i].isCaptain = i === 0 ? '队长' : '队员'
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
    code: string
    name: string
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
      dataIndex: 'code',
      key: '3',
    },
  ]

  return (
    <div className="reviewApprover-main">
      <TopBar activity="评审" />
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
                onClick={(e) => e.preventDefault()}
                targetOffset={targetOffset}
              >
                <Link href="#team" title="队伍名称" />
                <Link href="#user-information" title="参赛者信息" />
                <Link href="#attach-message" title="文字展示" />
                <Link href="#show-work" title="作品展示" />
              </Anchor>
            </div>
            <div className="content">
              <div id="team" className="item">
                <h1 style={{ fontSize: '25px' }}>队伍名称</h1>
                <h3>队伍: {dataList.teamName}</h3>
              </div>

              <div id="user-information" className="item">
                <h1 style={{ fontSize: '25px' }}>参赛者信息</h1>
                <h3>
                  <Table<DataType> dataSource={dataList.memberList} columns={columns} />
                </h3>
              </div>

              <div id="attach-message" className="item">
                <h1 style={{ fontSize: '25px' }}>文字展示</h1>
                <div className="texts">
                  {dataList.texts.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        {item.input}:{item.content}
                      </li>
                    )
                  })}
                </div>
              </div>

              <div id="show-work" className="item">
                <h1 style={{ fontSize: '25px' }}>作品展示</h1>
                <div className="accessorices">
                  {dataList.accessories.map((item: any, index: number) => {
                    return (
                      // <div key={index}>
                      //   <a
                      //     href={item.url}
                      //     onClick={(e) => {
                      //       e.preventDefault()
                      //       setShow(true)
                      //     }}
                      //   >
                      //     {item.file}
                      //   </a>
                      //   {show ? <Pdf url={item.url} /> : <p></p>}
                      // </div>
                      <div key={index}>
                        <a
                          href={item.url}
                          onClick={(e) => {
                            e.preventDefault()
                            downloadFile(item.url)
                          }}
                        >
                          {item.file}
                        </a>
                        <Button
                          style={{ marginLeft: '30px', marginTop: '10px' }}
                          type="primary"
                          shape="round"
                          icon={<DownloadOutlined />}
                          size={'large'}
                          onClick={() => {
                            downloadFile(item.url)
                          }}
                        >
                          下载附件
                        </Button>
                      </div>
                    )
                  })}
                </div>
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
              <span>评语: </span>
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

              <Form.Item label="评语">
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
