import React, { useEffect, useState } from 'react'
import { Anchor, Button, Radio, Input, notification, message } from 'antd'
import { getJudgeWorkInfo } from '../../api/judge'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadWorkJudgeInfo } from '../../api/judge'
import TopBar from '../../components/TopBar'
import './index.scss'
import { fileDownload } from '../../api/public'
import { DownloadOutlined } from '@ant-design/icons'

const { Link } = Anchor

const ReviewJudge: React.FC = (props) => {
  // 获取作品id
  const { id } = useParams()
  console.log(id)

  const [isPass, setIsPass] = useState(false)
  const [opinion, setOpinion] = useState('')

  const { TextArea } = Input

  const [dataList, setDataList] = useState({
    title: '',
    introduce: '',
    memberList: [],
    accessories: [],
    texts: [],
  })

  console.log(props)
  const total = Number(localStorage.getItem('listTotal'))

  // 提交
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
  const handleSubmit = () => {
    if (opinion !== '') {
      uploadWorkJudgeInfo(Number(id), isPass!, opinion!).then(() => {
        // if (Number(id) === total) {
        //   setTimeout(() => {
        //     notification.info({
        //       message: '😸️ 审批完成',
        //       description: '这是最后一个',
        //       top: 20,
        //       placement: 'top',
        //     })
        //   }, 300)
        // } else if (current > total) {
        //   navigate('/review/detail?id=' + total)
        // } else {
        setTimeout(() => {
          notification.info({
            message: '✅ 提交成功',
            description: '自动返回列表',
            top: 20,
            placement: 'top',
          })
        }, 100)
        // navigate('/review/detail/' + (current + 1))
        window.history.back()
      })
      // }
      // })
    } else {
      setTimeout(() => {
        notification.info({
          message: 'x 提交失败',
          description: '意见不能为空',
          top: 20,
          placement: 'top',
        })
      }, 300)
    }
  }

  useEffect(() => {
    // 请求数据，并把列表中的成员是否为队长布尔型换为字符串
    getJudgeWorkInfo(Number(id)).then((res) => {
      const result = res.data.data
      result.memberList.unshift(res.data.data.captain)

      for (let i = 0; i < res.data.data.memberList.length; i++) {
        result.memberList[i].isCaptain = i === 0 ? '队长' : '队员'
      }
      setDataList(result)
    })
  }, [id])
  // document.querySelector('.navigation').addEventListener('scroll', handleScroll)
  return (
    <div className="reviewJudge-main">
      <TopBar activity="审批" />
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
                // targetOffset={targetOffset}
                onClick={(e) => e.preventDefault()}
                // affix={false}
                // showInkInFixed={true}
                // onChange={(link) => console.log('Anchor:OnChange', link)}
                // getContainer={() => document.querySelector('.message')}
              >
                <Link href="#user-information" title="参赛者信息" target="" />
                <Link href="#show-work" title="作品展示" />
              </Anchor>
            </div>
            <div className="content">
              <ul id="user-information" className="item">
                <h2 style={{ fontSize: '32px' }}>参赛者信息</h2>
                <div className="udata">
                  {dataList.memberList.map((item: any, index: any) => (
                    <div style={{ marginLeft: '20px' }} key={index}>
                      <li>
                        <span>姓名:</span>
                        {item.name}
                      </li>
                      <li>
                        <span>学号:</span>
                        {item.code}
                      </li>
                      <li>
                        <span>职务:</span>
                        {item.isCaptain}
                      </li>
                    </div>
                  ))}
                </div>
              </ul>
              <div id="show-work" className="item">
                {/* <h2>指导老师：{dataList.texts}</h2> */}
                <h2 style={{ marginLeft: '40px', fontSize: '32px' }}>作品展示</h2>
                <div className="texts">
                  {dataList.texts.map((item: any, index: number) => {
                    return (
                      <h1 key={index}>
                        <span style={{ marginLeft: '35px' }}>{item.input}:</span>
                        <span>{item.content}</span>
                      </h1>
                    )
                  })}
                  {/* <h3>{dataList.introduce}</h3> */}
                  {/* <a href="javascript;">{dataList.accessories}</a> */}
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

                      <div key={index} style={{ marginLeft: '35px' }}>
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
              <TextArea
                rows={4}
                className="inputbox"
                style={{ height: '80px' }}
                placeholder="未通过原因"
                onChange={(e) => {
                  setOpinion(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewJudge
