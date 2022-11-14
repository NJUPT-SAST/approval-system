import './index.scss'
import React from 'react'
import TopBar from '../../components/TopBar'
import { useRecoilState } from 'recoil'
import userProfileStore from '../../store/userProfile'
// import { getUserProfile } from '../../api/user'
// import { Spin } from 'antd'
// import { LoadingOutlined } from '@ant-design/icons'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { message, Upload, Button, Form, Input, Select } from 'antd'
// import type { UploadChangeParam } from 'antd/lib/upload/'
// import type { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface'
// import { LoadingOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'

interface InfoItem {
  title: string
  content: string
}

// interface userApiData {
//   name: string
//   code: string
//   major: string
//   faculty: string
// }

// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result as string))
//   reader.readAsDataURL(img)
// }

// const uploadProps: UploadProps = {
//   name: 'avatar',
//   showUploadList: false,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   beforeUpload(file: RcFile) {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!')
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!')
//     }
//     return isJpgOrPng && isLt2M
//   },
// }

// function Edit() {
//   return (
//     <>
//       <TopBar activity="编辑" />
//       <div className="account">
//         <Form className="edit" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal">
//           <Form.Item label="姓名">
//             <Input />
//           </Form.Item>
//           <Form.Item label="年级">
//             <Select>
//               <Select.Option value="demo">大一</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="学院">
//             <Select>
//               <Select.Option value="demo">计算机学院、软件学院、网络空间安全学院</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="专业">
//             <Select>
//               <Select.Option value="demo">软件工程</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="电话">
//             <Input />
//           </Form.Item>
//           <Form.Item label="QQ">
//             <Input />
//           </Form.Item>
//           <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
//             <Button type="primary" icon={<SaveOutlined />}>
//               保存
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   )
// }

// function Pass() {
//   return (
//     <>
//       <TopBar activity="修改密码" />
//       <div className="account">
//         <div className="pass">
//           <p className="title">账号信息</p>
//           <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} layout="horizontal">
//             <Form.Item label="账号">
//               <span className="name">B21021021</span>
//             </Form.Item>
//             <Form.Item label="原密码">
//               <Input placeholder="输入原密码" />
//             </Form.Item>
//             <Form.Item label="新密码">
//               <Input placeholder="输入新密码" />
//             </Form.Item>
//             <Form.Item label="新密码">
//               <Input placeholder="再次输入新密码" />
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
//               <Button type="primary">修 改</Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </>
//   )
// }

function Main() {
  // const [loading, setLoading] = useState(false)
  // const [imageUrl, setImageUrl] = useState<string>()

  // const navigate = useNavigate()

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : <PlusOutlined style={{ fontSize: '20px' }} />}
  //     <div style={{ marginTop: 8 }}>上传头像</div>
  //   </div>
  // )

  // const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true)
  //     return
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false)
  //       setImageUrl(url)
  //     })
  //   }
  // }
  const userProfile = useRecoilState(userProfileStore)
  // const [isLoading, setIsLoading] = useState(false)
  // const loadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />


  // const [personalInfo, setPersonalInfo] = useState<Record<string, InfoItem>>({
  const personalInfo: Record<string, InfoItem> = {
    name: {
      title: '姓名',
      content: `${userProfile[0].name}`,
    },
    grade: {
      title: '年级',
      content: `20${userProfile[0].code.charAt(1)}${userProfile[0].code.charAt(2)}级`
    },
    faculty: {
      title: '学院',
      content: `${userProfile[0].faculty}`,
    },
    major: {
      title: '专业',
      content: `${userProfile[0].major}`,
    },
  }

  // const [accountInfo, setAccountInfo] = useState<Record<string, InfoItem>>({
  const accountInfo: Record<string, InfoItem> = {
    account: {
      title: '账号',
      content: `${userProfile[0].code}`,
    },
    password: {
      title: '密码',
      content: '*********',
    },
  }

  const InfoItem = (props: { title: string; content: string }) => (
    <div className="info-item">
      <span className="title">{props.title}：</span>
      <span className="content">{props.content}</span>
    </div>
  )

  // useEffect(() => {
  //   const code = localStorage.getItem('code')
  //   let userInfo: userApiData | string | null = code ? sessionStorage.getItem(code) : null

  //   async function getUserInfo() {
  //     if (userInfo) return

  //     try {
  //       const res = (await getUserProfile()).data

  //       if (res.success) {
  //         userInfo = JSON.stringify(res.data)
  //         sessionStorage.setItem(res.data.code, userInfo)
  //       }
  //     } catch {
  //       console.log('请求网络失败')
  //     }
  //   }

  //   getUserInfo().then(() => {
  //     userInfo = JSON.parse(userInfo as string) as userApiData

  //     const {
  //       code = 'B21021021',
  //       name = '王小明',
  //       major = '软件工程',
  //       faculty = '计算机学院、软件学院、网络空间安全学院',
  //     } = userInfo

  //     // 初始化数据
  //     setAccountInfo({
  //       ...accountInfo,
  //       account: Object.assign({}, accountInfo.account, {
  //         content: code,
  //       }),
  //     })

  //     setPersonalInfo({
  //       ...personalInfo,
  //       name: Object.assign({}, personalInfo.name, {
  //         content: name,
  //       }),
  //       major: Object.assign({}, personalInfo.major, {
  //         content: major,
  //       }),
  //       grade: Object.assign({}, personalInfo.grade, {
  //         content: codeToGrade(code),
  //       }),
  //       faculty: Object.assign({}, personalInfo.faculty, {
  //         content: faculty,
  //       }),
  //     })

  //     setIsLoading(false)
  //   })

  //   // B21150124
  //   function codeToGrade(code: string): string {
  //     let reulst = '未知'
  //     const newYear = new Date().getFullYear() - 2000

  //     if (code.length === 9) {
  //       let year: number | string = code.slice(1, 3)
  //       year = year.length === 2 ? parseInt(year) : 18

  //       switch (newYear - year) {
  //         case 0:
  //           reulst = '大一'
  //           break
  //         case 1:
  //           reulst = '大二'
  //           break
  //         case 2:
  //           reulst = '大三'
  //           break
  //         case 3:
  //           reulst = '大四'
  //           break

  //         default:
  //           break
  //       }
  //     }

  //     return reulst
  //   }
  // }, [])

  return (
    <>
      <TopBar />
      <div className="account">
        {/* {isLoading ? (
          <div className="loading">
            <Spin tip="^_^信息加载中……" className="loading" size="large" indicator={loadingIcon}></Spin>
          </div>
        ) : ( */}
          <div className="account-wrap">
            {/* 头像部分内容 */}
            {/* <div className="upload-avatar">
              <Upload {...uploadProps} listType="picture-card" className="avatar-uploader" onChange={handleChange}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>

              <Upload {...uploadProps} listType="picture" onChange={handleChange}>
                <Button type="primary">点击上传</Button>
              </Upload>

              <span className="tips">仅支持JPG、GIF、PNG格式，文件小于5M</span>
            </div> */}
            <div className="personal-info">
              <p className="info-title">个人信息</p>
              <div className="info-wrap">
                {Object.keys(personalInfo).map((key, index) => (
                  <InfoItem key={index} title={personalInfo[key].title} content={personalInfo[key].content} />
                ))}
              </div>
              {/* <Button className="personal-btn" type="primary" onClick={() => navigate('/account?type=edit')}>
                编辑
              </Button> */}
            </div>
            <div className="account-info">
              <p className="info-title">账号信息</p>
              <div className="info-wrap">
                {Object.keys(accountInfo).map((key, index) => (
                  <InfoItem key={index} title={accountInfo[key].title} content={accountInfo[key].content} />
                ))}
              </div>
              {/* <Button className="account-btn" type="primary" onClick={() => navigate('/account?type=pass')}>
                修改密码
              </Button> */}
            </div>
          </div>
        {/* )} */}
      </div>
    </>
  )
}

function Account() {
  // const [params] = useSearchParams()
  // const type = params.get('type')

  // return <>{type === 'pass' ? <Pass /> : type === 'edit' ? <Edit /> : <Main />}</>

  return <Main />
}

export default Account
