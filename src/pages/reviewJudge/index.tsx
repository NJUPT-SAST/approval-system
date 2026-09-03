import React, { useEffect, useState } from 'react'
import { Anchor, Button, Radio, Input, notification, message } from 'antd'
import { getJudgeWorkInfo } from '../../api/judge'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadWorkJudgeInfo } from '../../api/judge'
import TopBar from '../../components/TopBar'
import './index.scss'
import { downloadCertificate } from '../../api/public'
import { isNetworkError, showNetworkErrorTip } from '../../util/download'
import { DownloadOutlined } from '@ant-design/icons'

const { Link } = Anchor

const ReviewJudge: React.FC = (props) => {
  // 获取项目id
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

  const getFileNameFromUrl = (url: string) => {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  };
  /**
   * 文件下载
   * @param url 文件url
   */
  const downloadFile = async (url: string) => {
    const loadingKey = 'downloading'
    message.loading({
      content: '正在下载文件',
      duration: 300000,
      key: 'downloading',
    })
    try {
      const res = await downloadCertificate(url)
      console.log(res.data);

      const response = res.data
      if (response.success) {
        const file = await fetch(response.data.url)
        const fileBlob = await file.blob()
        const urlvalue = window.URL.createObjectURL(fileBlob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = urlvalue
        a.download = getFileNameFromUrl(url)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(urlvalue)
        message.success({
          content: '😁下载完成！'
        })
      } else {
        message.error({
          content: '😞 下载发生了错误，请联系管理员',
          key: 'downloading',
        })
      }
    } catch (error) {
      if (isNetworkError(error)) {
        showNetworkErrorTip()
      } else {
        message.error({
          content: '😞 下载发生了错误，请联系管理员',
          key: 'downloading',
        })
      }
    }
    message.destroy(loadingKey)
  }
  const handleSubmit = () => {
    console.log(isPass);

    if (isPass || (!isPass && opinion !== '')) {
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
      <TopBar activity="审核" />
      <div className="manage-content-body">
        <div className="manage-content-header">
          <h1 className="manage-content-title">审核</h1>
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
                <Link href="#show-work" title="项目展示" />
              </Anchor>
            </div>
            <div className="content">
              <div id="user-information" className="item">
                <h2 className="list-title-h1">参赛者信息</h2>

                {dataList.memberList.map((item: any, index: any) => (
                  <div className="list" key={index}>
                    <div className="list-item">
                      <div className="title">姓名:</div>
                      <div className="content">{item.name}</div>
                    </div>
                    <div className="list-item">
                      <div className="title">学号:</div>
                      <div className="content">{item.code}</div>
                    </div>
                    <div className="list-item">
                      <div className="title">备注:</div>
                      <div className="content">{item.isCaptain}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div id="show-work" className="item">
                {/* <h2>指导老师：{dataList.texts}</h2> */}
                <div className="list-title-h1">项目展示</div>
                <div className="list">
                  {dataList.texts.map((item: any, index: number) => {
                    return (
                      <div className="list-item" key={index}>
                        <div className="title">{item.input}:</div>
                        <div className="content">{item.content}</div>
                      </div>
                    )
                  })}
                </div>
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
          {/* <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} /> */}
          <div className="judge">
            <div className="inputBox">
              <Radio.Group
                onChange={(e) => {
                  setIsPass(e.target.value === 'pass' ? true : false)
                }}
              >
                <span style={{ marginRight: '10px', marginLeft: '60px' }}>审核结果: </span>
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
