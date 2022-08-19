import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { competitionInfoType } from '../../type/apiTypes'
import { Button, Input, message, notification, Radio, RadioChangeEvent, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { createCompetitionInfo } from '../../api/admin'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { MouseEventHandler, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userProfileStore from '../../store/userProfile'
import TopBar from '../../components/TopBar'
import './index.scss'
import TimeRanger from './TimeRanger'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeImageUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
  if (!isJpgOrPng) {
    message.error('封面仅支持jpg、png和gif！')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('图片大小必须小于5MB！')
  }
  return isJpgOrPng && isLt5M
}

//团队比赛人数（最多15人）
const teamMemberNumArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
const code = localStorage.get
function Create() {
  //上传比赛照片
  const Navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const location = useLocation()
  //获取 code
  const userProfile = useRecoilValue(userProfileStore)
  //判断是修改还是创建 id为 -1 则为创建 否则为 修改
  const [competitionId, setCompetitionId] = useState<number>(-1)
  const [competitionInfo, setCompetitionInfo] = useState<competitionInfoType>({
    name: '', // 比赛名称
    reg_begin_time: '', // 报名开始时间
    reg_end_time: '', // 报名结束时间
    submit_begin_time: '', // 活动提交开始时间
    submit_end_time: '', // 活动提交结束时间
    review_begin_time: '', // 评审开始时间
    review_end_time: '', // 评审结束时间
    table: null, // 文档中的注释："表单schema，我不知道是啥"
    type: 1, // 0 团队 1 个人
    min_team_members: 1, // 默认值：1 值：1 团队人数限制
    max_team_members: 2, // 值：2 团队人数限制
    user_code: userProfile.code, // 值：1 活动负责人id
    is_review: 1, // 0 <= 值 <= 1 是否已在审批 0 表审批 1 未审批
    review_settings: {}, // 此处无注释 无类型
    introduce: '', // 比赛介绍
  })

  const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传照片</div>
    </div>
  )

  //比赛类型变化时
  const onTypeChange = (e: RadioChangeEvent) => {
    //若更改后类型为个体 则将最大人数默认为2
    if (e.target.value === 1) {
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.max_team_members = 2
        console.log(a.type)
        return a
      })
    }
    setCompetitionInfo((pre) => {
      const a = { ...pre }
      a.type = e.target.value
      return a
    })
  }

  /**
   * 团队比赛人数变化
   * @param value
   */
  const onTeamMemberNumChange = (value: string) => {
    setCompetitionInfo((pre) => {
      const a = { ...pre }
      a.max_team_members = parseInt(value)
      return a
    })
  }

  /**
   * 设置开始时间
   * @param time 时间 格式为 YYYY-MM-DD HH:mm:ss
   * @param operation 分为 signUp submit review
   */
  const setStartTime = (time: string, operation: string) => {
    if (operation === 'signUp')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.reg_begin_time = time
        return a
      })
    if (operation === 'submit')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.submit_begin_time = time
        return a
      })
    if (operation === 'review')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.review_begin_time = time
        return a
      })
  }

  /**
   *
   * @param time 时间 格式为 YYYY-MM-DD HH:mm:ss
   * @param operation 分为 signUp submit review
   */
  //设置结束时间
  const setEndTime = (time: string, operation: string) => {
    if (operation === 'signUp')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.reg_end_time = time
        return a
      })
    if (operation === 'submit')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.submit_end_time = time
        return a
      })
    if (operation === 'review')
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.review_end_time = time
        return a
      })
  }

  const postCompetition = () => {
    if (competitionId === -1) {
      createCompetitionInfo(competitionInfo).then(
        (res) => {
          if (res.data.success) {
            console.log('ok')
            setTimeout(() => {
              notification.success({
                message: '😸️ 登录成功',
                top: 20,
                placement: 'top',
              })
            }, 100)
          }
        },
        (error) => {
          console.log(error)
          setTimeout(() => {
            notification.success({
              message: '😸️ 发布失败',
              top: 20,
              placement: 'top',
            })
          }, 100)
        },
      )
    }
  }

  //允许报名白名单 意义不明
  const [allowWhite, setAllowWhite] = useState<boolean>(false)

  useEffect(() => {
    if (location.state) console.log(location.state)
    else {
      console.log(null)
    }
    console.log(competitionInfo)
  })
  return (
    <div>
      <TopBar activity='"挑战杯"创新创业比赛' />
      <div className="activity-create-header">
        <h1 id="activity-create-header-title">创建活动</h1>
        <div className="activity-create-header-buttons">
          {/* //todo 发布时校验比赛简介字数大于100 */}
          <Button
            type="primary"
            size="small"
            onClick={() => {
              postCompetition()
            }}
          >
            发布
          </Button>
          <Button
            type="primary"
            size="small"
            id="activity-create-cancel"
            onClick={() => {
              Navigate(-1)
            }}
          >
            取消
          </Button>
        </div>
      </div>
      <div className="activity-create-body">
        <div className="activity-create-cover">
          <span id="activity-create-cover-title">比赛封面</span>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            //todo 修改上传地址
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeImageUpload}
            onChange={handleImageChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
          <div className="activity-create-cover-upload">
            <Button type="primary" size="small" id="activity-create-cancel">
              点击上传
            </Button>
            <span id="activity-create-cover-tips">仅支持JPG、GIF、PNG格式，文件小于5M</span>
          </div>
        </div>
        <div className="activity-create-name">
          <span id="activity-create-name">比赛名称</span>
          <Input
            maxLength={15}
            placeholder="清晰简洁，不得多于15字"
            value={competitionInfo.name}
            showCount={false}
            onChange={(e) => {
              setCompetitionInfo((pre) => {
                const a = { ...pre }
                a.name = e.target.value
                return a
              })
            }}
            onBlur={(e) => {
              setCompetitionInfo((pre) => {
                const a = { ...pre }
                a.name = e.target.value
                return a
              })
            }}
          />
        </div>
        <div className="activity-create-type">
          <span id="activity-create-type">比赛类型</span>
          <Radio.Group onChange={onTypeChange} value={competitionInfo.type}>
            <Radio value={1}>单人</Radio>
            <Radio value={0}>团队</Radio>
          </Radio.Group>
          <span id="activity-create-type-tips">（不可超过15人）</span>
          {/* 当比赛类型选中团队时才出现 */}
          {competitionInfo.type === 0 ? (
            <Select
              showSearch
              placeholder="最大人数"
              optionFilterProp="children"
              onChange={onTeamMemberNumChange}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {teamMemberNumArray.map((value) => {
                return (
                  <Select.Option value={value} key={value}>
                    {value}
                  </Select.Option>
                )
              })}
            </Select>
          ) : (
            <></>
          )}
        </div>
        <div className="activity-create-des">
          <span id="activity-create-des">比赛简介</span>
          <TextArea
            value={competitionInfo.introduce}
            onChange={(e) =>
              setCompetitionInfo((pre) => {
                const a = { ...pre }
                a.introduce = e.target.value
                return a
              })
            }
            onBlur={(e) =>
              setCompetitionInfo((pre) => {
                const a = { ...pre }
                a.introduce = e.target.value
                return a
              })
            }
            placeholder="不少于100字，不超过1000字"
            maxLength={1000}
          />
        </div>
        <TimeRanger
          operation="signUp"
          preStartTime={competitionInfo.reg_begin_time}
          setStartTime={setStartTime}
          preEndTime={competitionInfo.reg_end_time}
          setEndTime={setEndTime}
        />
        <TimeRanger
          operation="submit"
          preStartTime={competitionInfo.submit_begin_time}
          setStartTime={setStartTime}
          preEndTime={competitionInfo.submit_end_time}
          setEndTime={setEndTime}
        />
        <TimeRanger
          operation="review"
          preStartTime={competitionInfo.review_begin_time}
          setStartTime={setStartTime}
          preEndTime={competitionInfo.review_end_time}
          setEndTime={setEndTime}
        />
        <div className="activity-create-white">
          <Radio
            checked={allowWhite}
            onClick={() => {
              setAllowWhite(!allowWhite)
            }}
          >
            允许报名白名单
          </Radio>
          {/* 只有选中白名单选项才会显示 */}
          {allowWhite ? <span id="activity-create-white-tips">每条内容请单列一行</span> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Create
