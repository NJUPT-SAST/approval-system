import './index.scss'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import { message, Upload, Button, Form, Input, Radio, Select } from 'antd'
import type { UploadChangeParam } from 'antd/lib/upload/'
import type { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { LoadingOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { RequiredMark } from 'antd/lib/form/Form'

interface InfoItem {
  title: string
  content: string
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const uploadProps: UploadProps = {
  name: 'avatar',
  showUploadList: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  },
}

function Edit() {
  return (
    <>
      <TopBar activity="编辑" />
      <div className="account">
        <Form className="edit" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
          <Form.Item label="姓名">
            <Input />
          </Form.Item>
          <Form.Item label="年级">
            <Select>
              <Select.Option value="demo">大一</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="学院">
            <Select>
              <Select.Option value="demo">计算机学院、软件学院、网络空间安全学院</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="专业">
            <Select>
              <Select.Option value="demo">软件工程</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="电话">
            <Input />
          </Form.Item>
          <Form.Item label="QQ">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" icon={<SaveOutlined />}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

function Pass() {
  return (
    <>
      <TopBar activity="修改密码" />
      <div className="account">
        <div className="pass">
          <p className="title">账号信息</p>
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} layout="horizontal">
            <Form.Item label="账号">
              <span className="name">B21021021</span>
            </Form.Item>
            <Form.Item label="原密码">
              <Input placeholder="输入原密码" />
            </Form.Item>
            <Form.Item label="新密码">
              <Input placeholder="输入新密码" />
            </Form.Item>
            <Form.Item label="新密码">
              <Input placeholder="再次输入新密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary">修 改</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

function Main() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [personalInfo, setPersonalInfo] = useState<Array<InfoItem>>([
    {
      title: '姓名',
      content: '王小明',
    },
    {
      title: '年纪',
      content: '大一',
    },
    {
      title: '学院',
      content: '计算机学院、软件学院、网络空间安全学院',
    },
    {
      title: '专业',
      content: '软件工程',
    },
    {
      title: '电话',
      content: '12300066',
    },
    {
      title: 'QQ',
      content: '12345678',
    },
  ])

  const [accountInfo, setAccountInfo] = useState<Array<InfoItem>>([
    {
      title: '账号',
      content: 'B21021021',
    },
    {
      title: '密码',
      content: '*********',
    },
  ])

  const navigate = useNavigate()

  const InfoTitle = (props: { title: string }) => (
    <p
      style={{
        color: 'rgb(0 0 0 / 85%)',
        height: '42px',
        fontSize: '24px',
        lineHeight: '22px',
        textShadow: '0 2px 4px rgb(0 0 0 / 25%)',
      }}
    >
      {props.title}
    </p>
  )

  const InfoItem = (props: { title: string; content: string }) => (
    <div className="info-item">
      <span className="title">{props.title}：</span>
      <span className="content">{props.content}</span>
    </div>
  )

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <PlusOutlined style={{ fontSize: '20px' }} />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  )

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  return (
    <>
      <TopBar />
      <div className="account">
        <div className="upload-avatar">
          <Upload {...uploadProps} listType="picture-card" className="avatar-uploader" onChange={handleChange}>
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>

          <Upload {...uploadProps} listType="picture" onChange={handleChange}>
            <Button type="primary">点击上传</Button>
          </Upload>

          <span className="tips">仅支持JPG、GIF、PNG格式，文件小于5M</span>
        </div>
        <div className="personal-info">
          <InfoTitle title="个人信息" />
          <div className="info-wrap">
            {personalInfo.map((item, index) => (
              <InfoItem key={index} title={item.title} content={item.content} />
            ))}
          </div>
          <Button className="personal-btn" type="primary" onClick={() => navigate('/account?type=edit')}>
            编辑
          </Button>
        </div>
        <div className="account-info">
          <InfoTitle title="账号信息" />
          <div className="info-wrap">
            {accountInfo.map((item, index) => (
              <InfoItem key={index} title={item.title} content={item.content} />
            ))}
          </div>
          <Button className="account-btn" type="primary" onClick={() => navigate('/account?type=pass')}>
            修改密码
          </Button>
        </div>
      </div>
    </>
  )
}

function Account() {
  const [params] = useSearchParams()
  const type = params.get('type')

  return <>{type === 'pass' ? <Pass /> : type === 'edit' ? <Edit /> : <Main />}</>
}

export default Account
