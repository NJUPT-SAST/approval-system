import { LoadingOutlined, PlusOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { competitionInfoType } from '../../type/apiTypes'
import { Button, Input, message, notification, Radio, RadioChangeEvent, Select, Upload, Steps } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { createCompetitionInfo, viewCompetitionInfo, editCompetitionInfo, deleteCompetitionInfo } from '../../api/admin'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { option, tempelate } from '../../store/formTemplate'
import userProfileStore from '../../store/userProfile'
import ReviewSet from '../create/Components/reviewerSet'
import TopBar from '../../components/TopBar'
import TimeRanger from '../create/TimeRanger'

// 替代泛型
function useMyLocation<T>() {
  return useLocation() as { state: T }
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

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

//团队比赛人数（最多15人）
const teamMemberNumArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']

const Edit: React.FC<any> = () => {
  //审批者数目
  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [cover, setCover] = useState<Blob>()
  const [preSchema, setPreSchema] = useState<object | null>(null)
  const [reviewerNum, setReviewerNum] = useState<number>(2)
  const { Option } = Select
  const Navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const { state } = useMyLocation<{ competitionId: number; competitionName: string }>()
  const [reviewSettings, setReviewSettings] = useState<{ key: number; value: string }[]>([
    { key: 0, value: '' },
    { key: -1, value: '' },
  ])
  const [baseUrl, setBaseUrl] = useState<string>('')
  //获取 code
  const userProfile = useRecoilValue(userProfileStore)

  const [competitionId, setCompetitionId] = useState<number>(state.competitionId)
  const [competitionInfo, setCompetitionInfo] = useState<competitionInfoType>({
    name: '', // 比赛名称
    reg_begin_time: '', // 报名开始时间
    reg_end_time: '', // 报名结束时间
    submit_begin_time: '', // 活动提交开始时间
    submit_end_time: '', // 活动提交结束时间
    review_begin_time: '', // 评审开始时间
    review_end_time: '', // 评审结束时间
    table: {}, // 文档中的注释："表单schema，我不知道是啥"
    type: 0, // 0 个人 1 团队
    min_team_members: 1, // 默认值：1 值：1 团队人数限制
    max_team_members: 1, // 值：2 团队人数限制
    user_code: userProfile.code, // 值：1 活动负责人id
    is_review: 1, // 0 <= 值 <= 1 是否已在审批 0 表审批 1 未审批
    introduce: '', // 比赛介绍
    cover: '', //封面url
  })

  const handleStepChange = (value: number) => {
    setCurrentStep(value)
  }

  const handleImageChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setLoading(true)
    // console.log(info.file)
    setCover(info.file.originFileObj as RcFile)
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setBaseUrl(url)
      setLoading(false)
    })
    // if (info.file.status === 'uploading') {
    //   console.log('loading')
    //   return
    // }
    // if (info.file.status === 'done') {
    //   console.log('done')
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj as RcFile, (url) => {
    //     setLoading(false)
    //     console.log(url)
    //     setCompetitionInfo((pre) => {
    //       const a = pre
    //       a.cover = url
    //       return a
    //     })
    //   })
    // }
  }
  // 用于antd组件
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {/* <div style={{ marginTop: 8 }}>上传照片</div> */}
    </div>
  )

  //比赛类型变化时
  const onTypeChange = (e: RadioChangeEvent) => {
    //若更改后类型为个体 则将最大人数默认为2
    if (e.target.value === 0) {
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.max_team_members = 1
        return a
      })
    } else {
      setCompetitionInfo((pre) => {
        const a = { ...pre }
        a.max_team_members = 2
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
   *  设置结束时间
   * @param time 时间 格式为 YYYY-MM-DD HH:mm:ss
   * @param operation 分为 signUp submit review
   */
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

  /**
   *
   * @param index reviewSettings 的下标
   * @param key 对应的键
   */
  const setKey = (index: number, key: number) => {
    setReviewSettings((pre) => {
      const a = [...pre]
      a[index].key = key
      return a
    })
  }

  /**
   *
   * @param index
   * @param value 对应的值
   */
  const setValue = (index: number, value: string) => {
    setReviewSettings((pre) => {
      const a = [...pre]
      a[index].value = value
      return a
    })
  }

  const editCompetition = () => {
    const reviewSetting_map: Map<number, string> = new Map([[reviewSettings[0].key, reviewSettings[0].value]])
    for (let i = 0; i < reviewerNum; i++) {
      reviewSetting_map.set(reviewSettings[i].key, reviewSettings[i].value)
    }
    // console.log(Object.fromEntries(reviewSetting_map.entries()))
    editCompetitionInfo(competitionId, competitionInfo, Object.fromEntries(reviewSetting_map.entries()), cover)
      .then((res) => {
        // console.log(res)
        if (res.data.success) {
          Navigate('../../activity/' + res.data.data)
          setTimeout(() => {
            notification.success({
              message: '😸️ 发布成功',
              description: '快去看看新活动吧',
              top: 20,
              placement: 'top',
            })
          }, 100)
        } else
          setTimeout(() => {
            notification.error({
              message: '😭️ 发布失败',
              description: res.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 发布失败',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  // 删除活动
  const deleteCompetition = () => {
    deleteCompetitionInfo(competitionId)
      .then((res) => {
        if (res.data.success) {
          Navigate('../../activity/')
          setTimeout(() => {
            notification.success({
              message: '😸️ 删除成功',
              top: 20,
              placement: 'top',
            })
          }, 100)
        } else
          setTimeout(() => {
            notification.error({
              message: '😭️ 发布失败',
              description: res.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 删除失败',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }

  useEffect(() => {
    setCompetitionId(state.competitionId)
    viewCompetitionInfo(state.competitionId)
      .then((res) => {
        console.log(res.data.data.table)
        if (res.data.success) {
          const array: { key: number; value: string }[] = []
          Object.getOwnPropertyNames(res.data.data.review_settings).forEach((key, index) => {
            array.push({ key: +key, value: res.data.data.review_settings[key] })
          })
          if (array.length === 0) {
            array.push({ key: 0, value: '' })
            array.push({ key: -1, value: '' })
          }
          if (array.length === 1) {
            array.push({ key: -1, value: '' })
          }
          setReviewerNum(array.length)
          setReviewSettings(array)
          setPreSchema(res.data.data.table)
          setBaseUrl(res.data.data.cover)
          setCompetitionInfo((pre) => {
            const a = { ...pre }
            a.introduce = res.data.data.introduce
            a.is_review = res.data.data.is_review
            a.max_team_members = res.data.data.max_team_members
            a.min_team_members = res.data.data.min_team_members
            a.name = res.data.data.name
            a.is_review = res.data.data.is_review
            a.reg_begin_time = res.data.data.reg_begin_time
            a.reg_end_time = res.data.data.reg_end_time
            a.review_begin_time = res.data.data.review_begin_time
            a.review_end_time = res.data.data.review_end_time
            a.table = res.data.data.table
            if (res.data.data.type === 'SINGLE_COMPETITION') a.type = 0
            else a.type = 1
            a.cover = res.data.data.cover
            a.user_code = res.data.data.user_code
            a.submit_begin_time = res.data.data.submit_begin_time
            a.submit_end_time = res.data.data.submit_end_time
            return a
          })
        } else {
          Navigate(-1)
          setTimeout(() => {
            notification.error({
              message: '😭️ 获取活动信息失败',
              description: res.data.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
        }
      })
      .catch((error) => {
        Navigate(-1)
        setTimeout(() => {
          notification.error({
            message: '😭️ 获取活动信息失败',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
  }, [])

  return (
    <div>
      <TopBar activity={state.competitionName} />
      <div className="activity-create-header">
        {currentStep === 0 ? (
          <div className="activity-create-header-buttons">
            <Button
              type="primary"
              size="small"
              danger
              onClick={() => {
                deleteCompetition()
              }}
            >
              删除
            </Button>

            <div className="activity-create-header-buttons-post-cancel">
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  editCompetition()
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
        ) : (
          <></>
        )}
      </div>
      <div className="activity-create-content">
        <div className="activity-create-steps">
          <Steps size="small" onChange={handleStepChange} current={currentStep} direction="vertical">
            <Step title="步骤 1" description="设置比赛信息" />
            <Step title="步骤 2" description="设置白名单" />
          </Steps>
        </div>
        {currentStep === 0 ? (
          <div className="activity-create-body">
            <div className="activity-create-cover">
              <span id="activity-create-cover-title">比赛封面</span>
              <Upload
                name="avatar"
                accept=".jpg,.jpeg,.png,.gif"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                customRequest={() => {
                  return 0
                }}
                // action=""
                beforeUpload={beforeImageUpload}
                onChange={handleImageChange}
              >
                {baseUrl === '' ? (
                  uploadButton
                ) : (
                  <img src={baseUrl === '' ? competitionInfo.cover : baseUrl} alt="avatar" style={{ width: '100%' }} />
                )}
              </Upload>
              <div className="activity-create-cover-upload">
                <span id="activity-create-cover-tips">仅支持JPG、GIF、PNG格式，文件小于5M</span>
              </div>
            </div>
            <div className="activity-create-name-and-template">
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
                />
              </div>
              <div className="activity-template-select">
                <span id="activity-template-select">表单选择</span>
                <Select
                  placeholder="请选择表单"
                  defaultValue={-1}
                  onChange={(value) => {
                    if (value === -1) {
                      setCompetitionInfo((pre) => {
                        const a = { ...pre }
                        a.table = preSchema as object
                        return a
                      })
                    } else {
                      setCompetitionInfo((pre) => {
                        const a = { ...pre }
                        a.table = tempelate[+value]
                        return a
                      })
                    }
                  }}
                >
                  {option.map((value, index) => {
                    return (
                      <Option key={'formTempelate ' + index} value={index}>
                        {value}
                      </Option>
                    )
                  })}
                  <Option value={-1}>不修改</Option>
                </Select>
              </div>
            </div>
            <div className="activity-create-type">
              <span id="activity-create-type">比赛类型</span>
              <Radio.Group onChange={onTypeChange} value={competitionInfo.type}>
                <Radio value={0}>单人</Radio>
                <Radio value={1}>团队</Radio>
              </Radio.Group>
              <span id="activity-create-type-tips">（不可超过15人）</span>
              {/* 当比赛类型选中团队时才出现 */}
              {competitionInfo.type === 1 ? (
                <Select
                  showSearch
                  defaultValue={competitionInfo.max_team_members.toString()}
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
                placeholder="不少于100字，不超过3000字"
                maxLength={3000}
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
            <div className="activity-create-reviewer-setting-default">
              <div className="activity-create-reviewer-setting-default-code">
                <span id="activity-create-reviewer-setting-default-code">默认审批者</span>
                <Input
                  className="first"
                  placeholder="审批者学号"
                  value={reviewSettings ? reviewSettings[0].value : ''}
                  onChange={(e) => {
                    setReviewSettings((pre) => {
                      const a = [...pre]
                      a[0].value = e.target.value
                      return a
                    })
                  }}
                  showCount={false}
                />
              </div>
              <div className="activity-create-reviewer-setting-default-change-number">
                <PlusSquareOutlined
                  className="manage-create-icon"
                  onClick={() => {
                    setReviewerNum(reviewerNum + 1)
                    setReviewSettings((pre) => {
                      const a = [...pre]
                      a.push({ key: -1, value: '' })
                      return a
                    })
                  }}
                />
                {reviewerNum === 1 ? (
                  <></>
                ) : (
                  <MinusSquareOutlined
                    className="manage-create-icon"
                    onClick={() => {
                      setReviewerNum(reviewerNum - 1)
                      setReviewSettings((pre) => {
                        const a = [...pre]
                        a.pop()
                        return a
                      })
                    }}
                  />
                )}
              </div>
            </div>
            <div className="other-setting">
              {reviewSettings.map((value, index) => {
                if (value.key === 0) return <></>
                else
                  return (
                    <ReviewSet
                      setKey={setKey}
                      setValue={setValue}
                      key={value.key + ' ' + index}
                      value={value}
                      index={index}
                    />
                  )
              })}
            </div>
            {/* <div className="activity-create-white">
                        <Radio
                            checked={allowWhite}
                            onClick={() => {
                                setAllowWhite(!allowWhite)
                            }}
                        >
                            允许报名白名单
                        </Radio>
                        {allowWhite ? <span id="activity-create-white-tips">每条内容请单列一行</span> : <></>}
                    </div> */}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
export default Edit
