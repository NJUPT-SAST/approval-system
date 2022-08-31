import { UploadOutlined } from '@ant-design/icons'
import { Button, Input, message, Result, Upload, UploadProps } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import FormRender, { useForm } from 'form-render'
import React, { Fragment, ReactElement, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fileDownload } from '../../api/public'
import {
  getCompetitionInfo,
  getTeamInfo,
  getWorkInfo,
  getWorkSchema,
  uploadWork,
  uploadWorkSchema,
} from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

interface infoType {
  file: {
    name: string
    originFileObj: File
    percent: 100
    response: Record<string, unknown>
    size: number
    status: string
    type: string
    uid: string
    xhr: File
  }
  fileList: [
    {
      name: string
      originFileObj: File
      percent: number
      response: Record<string, unknown>
      size: number
      status: string
      type: string
      uid: string
      xhr: File
    },
  ]
}
interface itemRenderType {
  originNode: ReactElement
  file: UploadFile
  fileList: object[]
  actions: { download: any; preview: any; remove: any }
}

function WorkDetail() {
  const { id } = useParams()
  const form = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errCode, setErrCode] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const [messageStatus, setMessageStatus] = useState('null')
  const [workData, setWorkData] = useState()
  const submitReadyData: string | { input: string; content: unknown }[] = []
  let localFileList: any
  const [fileList, setFileList] = useState<{
    [index: string]: {
      uid?: string
      name: string
      status: string
      url: string
    }[]
  }>({})

  const getFileName = (url: string) => {
    const nameList = url.split('/')
    const fileName = nameList[nameList.length - 1]
    // console.log(fileName)
    return fileName
  }

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
    fileDownload(url).then((res) => {
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
  }

  const useGetWorkSchema = () => {
    const [schemaData, setSchemaData] = useState()
    useLayoutEffect(() => {
      message.loading({
        content: '🤔 正在加载已填写的数据',
        duration: 500,
        key: 'loading',
      })
      getWorkSchema(Number(id)).then((res) => {
        // console.log(res)
        setSchemaData(res.data)
      })
      getWorkInfo(Number(id)).then((res) => {
        // console.log(res)
        setWorkData(res.data.data)
        if (res.data.errCode === null) {
          message.success({
            content: '😸 信息加载成功',
            key: 'loading',
          })
          res.data.data.map((item: { input: string; isFile: boolean; content: string }, index: number) => {
            form.setValueByPath(item.input, item.content)
            if (item.isFile === true) {
              setFileList((prev) => {
                return {
                  ...prev,
                  [item.input]: [
                    {
                      name: getFileName(item.content),
                      status: 'done',
                      url: item.content,
                    },
                  ],
                }
              })
            }
          })
        }
      })
    }, [])
    return schemaData
  }
  const schema: any = useGetWorkSchema()
  /**
   * 自封装的upload组件
   * @param props 来自schema的必须参数
   * @returns Uploader组件
   */
  function Uploader(props: { competitionId: number; inputName: string; accept: string }) {
    if (fileList[props.inputName] !== undefined) {
      localFileList = fileList[props.inputName]
    } else {
      setFileList((prev) => {
        return {
          ...prev,
          [props.inputName]: [],
        }
      })
    }
    const onRemove = (inputName: string) => {
      form.setValueByPath(inputName, null)
      setFileList((prev) => {
        return {
          ...prev,
          [inputName]: [],
        }
      })
    }
    const handleDownload = (file: string) => {
      console.log(file)
      // downloadFile()
    }
    const localProps: any = {
      accept: props.accept,
      maxCount: '1',
      onChange(info: infoType) {
        localFileList = fileList[props.inputName]
        console.log('onChange', info)
        let newFileList = [...info.fileList]

        // // 1. Limit the number of uploaded files
        // // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2)

        // 2. Read from response and show file link
        newFileList = newFileList.map((file: any) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url
          }
          return file
        })
        console.log('new list', newFileList)

        setFileList((prev: any) => {
          console.log('list updated')
          return { ...prev, [props.inputName]: newFileList }
        })
        if (newFileList.length === 0) {
          form.setValueByPath(props.inputName, null)
        }
      },
      customRequest(options: any) {
        console.log('options', options)
        const { onSuccess, onError, file, onProgress } = options
        uploadWork(Number(props.competitionId), props.inputName, file, onProgress).then((res) => {
          console.log(res)
          if (res.data.errCode === null) {
            onSuccess(res, file)
            message.success({
              content: file.name + ' 上传成功',
            })
            setFileList((prev) => {
              return {
                ...prev,
                [props.inputName]: [{ ...prev[props.inputName][0], status: 'done' }],
              }
            })
            form.setValueByPath(props.inputName, res.data.data.url)
          }
        })
      },
      headers: { Token: localStorage.getItem('token') },
      fileList: localFileList,
      showUploadList: { showDownloadIcon: true },
      onPreview(file: any) {
        console.log(file)
        downloadFile(file.url)
      },
      // onRemove: onRemove(props.inputName),
      // onDownload: onDownload(fileList[props.inputName][0].url)
    }
    // console.log(fileList)
    return (
      <Upload
        {...localProps}
        onDownload={(file) => {
          console.log(file)
          if (file.url !== undefined) {
            downloadFile(file.url)
          }
        }}
      >
        <Button icon={<UploadOutlined />}>点击上传文件</Button>
      </Upload>
    )
  }

  /**
   * 获取比赛的详细信息
   * @param id 比赛的id
   * @returns 返回比赛详细信息的state
   */
  const useGetCompetitionDetail = (id: number) => {
    interface competitionDetailType {
      introduce: string
      name: string
      regBegin: string
      regEnd: string
      reviewBegin: string
      reviewEnd: string
      status: number
      submitBegin: string
      submitEnd: string
      cover: string
    }
    const [competitionDetail, setCompetitionDetail] = useState<competitionDetailType>({
      introduce: '载入中',
      name: '载入中',
      regBegin: '载入中',
      regEnd: '载入中',
      reviewBegin: '载入中',
      reviewEnd: '载入中',
      status: 0,
      submitBegin: '载入中',
      submitEnd: '载入中',
      cover: '',
    })
    useLayoutEffect(() => {
      setLoading(true)
      getCompetitionInfo(Number(id)).then((res) => {
        // console.log(res)
        setCompetitionDetail(res.data.data)
        setTimeout(() => {
          setLoading(false)
        }, 100)
      })
    }, [])
    return competitionDetail
  }
  const competitionDetail = useGetCompetitionDetail(Number(id))

  const submitData = (formData: any, errors: any) => {
    console.log('formData:', formData, 'errors', errors)
    if (errors.length === 0) {
      const formDataList = Object.entries(formData)
      console.log(formDataList)
      for (const [key, value] of formDataList) {
        submitReadyData.push({
          input: key,
          content: value,
        })
      }
      uploadWorkSchema(Number(id), submitReadyData).then((res) => {
        console.log(res)
        if (res.data.errCode === null) {
          setMessageSent(true)
          setMessageStatus('success')
        } else {
          setMessageSent(true)
          setMessageStatus('error')
          setErrCode(res.data.data.errCode)
          setErrMsg(res.data.data.errMsg)
        }
      })
    } else {
      message.error('🤔 似乎表单有位置忘了写或者文件尚未上传？')
    }
  }

  const customUpload = (options: any) => {
    console.log(options)
    const { onSuccess, onError, file, onProgress } = options
    const formData = new FormData()
    if (id !== undefined) {
      formData.append('id', id.toString())
    }
    formData.append('input', file)
  }

  const localSchema: any = {
    type: 'object',
    labelWidth: 120,
    properties: {
      是否为STITP项目: {
        enum: ['是', '否'],
        type: 'string',
        title: '是否为STITP项目',
        widget: 'radio',
        required: true,
        enumNames: ['是', '否'],
      },
      申报书: {
        type: 'string',
        widget: 'customUpload',
        title: '申报书',
        required: true,
        props: {
          competitionId: id,
          inputName: '申报书',
          accept: '.pdf',
        },
      },
      研究报告: {
        type: 'string',
        widget: 'customUpload',
        title: '研究报告',
        required: true,
        props: {
          competitionId: id,
          inputName: '研究报告',
          accept: '.pdf',
        },
      },
      作品简介书: {
        type: 'string',
        widget: 'customUpload',
        title: '作品简介书',
        required: true,
        props: {
          competitionId: id,
          inputName: '作品简介书',
          accept: '.pdf',
        },
      },
      作品名称: { type: 'string', props: {}, title: '作品名称', required: true },
      作品类别: {
        enum: ['自然科学类学术论文', '哲学社会科学类社会调查报告和学术论文', '科技发明制作A类', '科技发明制作B类'],
        type: 'string',
        title: '作品类别',
        widget: 'select',
        required: true,
        enumNames: ['自然科学类学术论文', '哲学社会科学类社会调查报告和学术论文', '科技发明制作A类', '科技发明制作B类'],
      },
      作品简介: { type: 'string', props: {}, title: '作品简介', format: 'textarea', required: true },
    },
    displayType: 'column',
  }
  const goBackToActivity = () => {
    navigate('/activity/' + id)
  }
  const editAgain = () => {
    setMessageSent(false)
  }
  const goBackToRegisterDetail = () => {
    navigate('/activity/' + id + '/register-detail')
  }
  // console.log(schema)
  return (
    <div>
      <TopBar activity={competitionDetail.name} />
      <div className="work-detail-body">
        <div className="title">作品提交信息</div>
        <div className="work-detail-box">
          {messageSent === true ? (
            messageStatus === 'success' ? (
              <Result
                status="success"
                title="😄️ 信息提交成功"
                subTitle="你的作品信息已提交，祝你比赛顺利"
                extra={[
                  <Button type="primary" key="back" onClick={goBackToActivity}>
                    返回比赛详情
                  </Button>,
                  <Button key="re-edit" onClick={goBackToRegisterDetail}>
                    返回报名详情
                  </Button>,
                ]}
              />
            ) : (
              <Result
                status="error"
                title="😭️ 提交时发生错误"
                subTitle={'错误代码：' + errCode + '，错误信息：' + errMsg + '，请及时联系管理员'}
                extra={[
                  <Button type="primary" onClick={goBackToActivity} key="back">
                    返回比赛详情
                  </Button>,
                  <Button key="retry" onClick={editAgain}>
                    重新尝试提交
                  </Button>,
                ]}
              />
            )
          ) : schema !== undefined ? (
            <Fragment>
              <FormRender
                widgets={{ customUpload: Uploader }}
                form={form}
                disabled={loading}
                schema={localSchema}
                onFinish={submitData}
              />
              <Button type="primary" onClick={form.submit}>
                提 交
              </Button>
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
