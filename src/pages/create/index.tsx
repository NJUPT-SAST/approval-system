import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, message, Radio, RadioChangeEvent, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { MouseEventHandler, useState } from 'react'
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
const teamMemberNumArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']

function Create() {
  //上传比赛照片
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string>()

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

  //比赛类型(1为单人，2位团队)
  const [matchType, setMatchType] = useState<number>(2)
  //比赛类型变化
  const onTypeChange = (e: RadioChangeEvent) => {
    setMatchType(e.target.value)
  }

  //团队比赛人数
  const [teamMemberNum, setTeamMemberNum] = useState<number>(0)
  //团队比赛人数变化
  const onTeamMemberNumChange = (value: string) => {
    setTeamMemberNum(parseInt(value))
  }

  //比赛简介输入框内容
  const [matchDes, setMatchDes] = useState<string | undefined>(undefined)

  //报名开始时间
  const [signUpStartTime, setSignUpStartTime] = useState<string | undefined>(undefined)

  //报名截止时间
  const [signUpEndTime, setSignUpEndTime] = useState<string | undefined>(undefined)

  //提交开始时间
  const [submitStartTime, setSubmitStartTime] = useState<string | undefined>(undefined)

  //提交截止时间
  const [submitEndTime, setSubmitEndTime] = useState<string | undefined>(undefined)

  //评审开始时间
  const [reviewStartTime, setReviewStartTime] = useState<string | undefined>(undefined)

  //评审截止时间
  const [reviewEndTime, setReviewEndTime] = useState<string | undefined>(undefined)

  //允许报名白名单
  const [allowWhite, setAllowWhite] = useState<boolean>(false)

  return (
    <div>
      <TopBar activity='"挑战杯"创新创业比赛' />
      <div className="activity-create-header">
        <h1 id="activity-create-header-title">创建活动</h1>
        <div className="activity-create-header-buttons">
          {/* //todo 发布时校验比赛简介字数大于100 */}
          <Button type="primary" size="small">
            发布
          </Button>
          <Button type="primary" size="small" id="activity-create-cancel">
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
          <Input maxLength={15} placeholder="清晰简洁，不得多于15字" showCount={false} />
        </div>
        <div className="activity-create-type">
          <span id="activity-create-type">比赛类型</span>
          <Radio.Group onChange={onTypeChange} value={matchType}>
            <Radio value={1}>单人</Radio>
            <Radio value={2}>团队</Radio>
          </Radio.Group>
          <span id="activity-create-type-tips">（不可超过15人）</span>
          {/* 当比赛类型选中团队时才出现 */}
          {matchType === 2 ? (
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
            value={matchDes}
            onChange={(e) => setMatchDes(e.target.value)}
            placeholder="不少于100字，不超过1000字"
            maxLength={1000}
          />
        </div>
        <TimeRanger operation="signUp" setStartTime={setSignUpStartTime} setEndTime={setSignUpEndTime} />
        <TimeRanger operation="submit" setStartTime={setSubmitStartTime} setEndTime={setSubmitEndTime} />
        <TimeRanger operation="review" setStartTime={setReviewStartTime} setEndTime={setReviewEndTime} />
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
