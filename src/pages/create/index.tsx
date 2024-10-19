import { LoadingOutlined, PlusOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { competitionInfoType } from '../../type/apiTypes'
import { Button, Input, message, notification, Radio, RadioChangeEvent, Select, Upload, Steps } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { createCompetitionInfo, viewCompetitionInfo, editCompetitionInfo, deleteCompetitionInfo } from '../../api/admin'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface'
import { useState, useEffect } from 'react'
import { editWhiteList } from '../../api/admin'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import WhiteListdetail from '../whiteList/components/whiteListdetail'
import { option, tempelate } from '../../store/formTemplate'
import userProfileStore from '../../store/userProfile'
import ReviewSet from './Components/reviewerSet'
import TopBar from '../../components/TopBar'
import './index.scss'
import TimeRanger from './TimeRanger'

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
const teamMemberNumArray = ['2', '3', '4', '5', '6', '7', '8']

function Create() {
  //上传比赛照片
  //审批者数目
  const [checked, setChecked] = useState<boolean>(false)
  const [fileList, setFileList] = useState<any>([])
  const { Step } = Steps
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [cover, setCover] = useState<Blob>()
  const [preSchema, setPreSchema] = useState<object | null>(null)
  const [reviewerNum, setReviewerNum] = useState<number>(2)
  const { Option } = Select
  const Navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const location = useMyLocation<{ competitionId: number }>()
  const [reviewSettings, setReviewSettings] = useState<{ key: number; value: string }[]>([
    { key: 0, value: '' },
    { key: -1, value: '' },
  ])
  const [baseUrl, setBaseUrl] = useState<string>('')
  //获取 code
  const userProfile = useRecoilValue(userProfileStore)

  const [competitionId, setCompetitionId] = useState<number>(-1)
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
    is_review: 1, // 0 <= 值 <= 1 表示是否需要审批 0代表不需要 1代表需要
    introduce: '', // 比赛介绍
    cover: '', //封面url
  })

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

  // 发布活动
  const postCompetition = () => {
    const reviewSetting_map: Map<number, string> = new Map([[reviewSettings[0].key, reviewSettings[0].value]])
    for (let i = 0; i < reviewerNum; i++) {
      reviewSetting_map.set(reviewSettings[i].key, reviewSettings[i].value)
    }
    // console.log(Object.fromEntries(reviewSetting_map.entries()))
    // -1 表示此时为创建活动
    // if (competitionId === -1) {
    //改成键值对形式
    competitionInfo.max_team_members = 8
    createCompetitionInfo(competitionInfo, Object.fromEntries(reviewSetting_map.entries()), cover)
      .then((res) => {
        if (res.data.success === true) {
          setCompetitionId(res.data.data)
          // Navigate('../../activity/' + res.data.data)
          setTimeout(() => {
            notification.success({
              message: '😸️ 发布成功',
              description: '请选择是否需要白名单',
              top: 20,
              placement: 'top',
            })
          }, 100)
          setCurrentStep(1)
        } else {
          setTimeout(() => {
            notification.error({
              message: '😭️ 发布失败',
              description: res.data.errMsg,
              top: 20,
              placement: 'top',
            })
          }, 100)
        }
      })
      .catch((error) => {
        setTimeout(() => {
          notification.error({
            message: '😭️ 发布失败',
            description: error + '',
            top: 20,
            placement: 'top',
          })
        }, 100)
      })
    // } else {
    //   editCompetitionInfo(competitionId, competitionInfo, Object.fromEntries(reviewSetting_map.entries()), cover)
    //     .then((res) => {
    //       // console.log(res)
    //       if (res.data.success) {
    //         Navigate('../../activity/' + res.data.data)
    //         setTimeout(() => {
    //           notification.success({
    //             message: '😸️ 发布成功',
    //             description: '快去看看新活动吧',
    //             top: 20,
    //             placement: 'top',
    //           })
    //         }, 100)
    //       } else
    //         setTimeout(() => {
    //           notification.error({
    //             message: '😭️ 发布失败',
    //             description: res.data.errMsg,
    //             top: 20,
    //             placement: 'top',
    //           })
    //         }, 100)
    //     })
    //     .catch((error) => {
    //       setTimeout(() => {
    //         notification.error({
    //           message: '😭️ 发布失败',
    //           top: 20,
    //           placement: 'top',
    //         })
    //       }, 100)
    //     })
    // }
  }
  // 允许报名白名单 意义不明
  const [allowWhite, setAllowWhite] = useState<boolean>(false)

  const handleFileChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file !== undefined) {
      setFileList([...info.fileList])
    } else return
  }
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked)
  }
  const postWhiteList = () => {
    if (!checked) {
      editWhiteList(competitionId, checked)
        .then((res) => {
          if (res.data.success) {
            Navigate('../../activity/' + competitionId)
            setTimeout(() => {
              notification.success({
                message: '设置成功！',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else
            setTimeout(() => {
              notification.error({
                message: '😭️ 设置失败',
                top: 20,
                placement: 'top',
              })
            }, 100)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (checked && fileList.length !== 0)
      editWhiteList(competitionId, checked, fileList[0].originFileObj)
        .then((res) => {
          if (res.data.success) {
            Navigate('../../activity/' + competitionId)
            setTimeout(() => {
              notification.success({
                message: '设置成功！',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else
            setTimeout(() => {
              notification.error({
                message: '😭️ 设置失败',
                top: 20,
                placement: 'top',
              })
            }, 100)
        })
        .catch((err) => {
          setTimeout(() => {
            notification.error({
              message: '😭️ 设置失败',
              top: 20,
              placement: 'top',
            })
          }, 100)
        })
    else {
      setTimeout(() => {
        notification.error({
          message: '😭️ 设置失败',
          description: '请先上传文件或者选择不设置白名单!',
          top: 20,
          placement: 'top',
        })
      }, 100)
    }
  }

  // 删除活动
  // const deleteCompetition = () => {
  //   deleteCompetitionInfo(competitionId)
  //     .then((res) => {
  //       if (res.data.success) {
  //         Navigate('../../activity/')
  //         setTimeout(() => {
  //           notification.success({
  //             message: '😸️ 删除成功',
  //             top: 20,
  //             placement: 'top',
  //           })
  //         }, 100)
  //       } else
  //         setTimeout(() => {
  //           notification.error({
  //             message: '😭️ 发布失败',
  //             description: res.data.errMsg,
  //             top: 20,
  //             placement: 'top',
  //           })
  //         }, 100)
  //     })
  //     .catch((error) => {
  //       setTimeout(() => {
  //         notification.error({
  //           message: '😭️ 删除失败',
  //           top: 20,
  //           placement: 'top',
  //         })
  //       }, 100)
  //     })
  // }

  useEffect(() => {
    // if (location.state) {
    //   setCompetitionId(location.state.competitionId)
    //   viewCompetitionInfo(location.state.competitionId)
    //     .then((res) => {
    //       console.log(res.data.data.table)
    //       if (res.data.success) {
    //         const array: { key: number; value: string }[] = []
    //         Object.getOwnPropertyNames(res.data.data.review_settings).forEach((key, index) => {
    //           array.push({ key: +key, value: res.data.data.review_settings[key] })
    //         })
    //         if (array.length === 0) {
    //           array.push({ key: 0, value: '' })
    //           array.push({ key: -1, value: '' })
    //         }
    //         if (array.length === 1) {
    //           array.push({ key: -1, value: '' })
    //         }
    //         setReviewerNum(array.length)
    //         setReviewSettings(array)
    //         setPreSchema(res.data.data.table)
    //         setBaseUrl(res.data.data.cover)
    //         setCompetitionInfo((pre) => {
    //           const a = { ...pre }
    //           a.introduce = res.data.data.introduce
    //           a.is_review = res.data.data.is_review
    //           a.max_team_members = res.data.data.max_team_members
    //           a.min_team_members = res.data.data.min_team_members
    //           a.name = res.data.data.name
    //           a.reg_begin_time = res.data.data.reg_begin_time
    //           a.reg_end_time = res.data.data.reg_end_time
    //           a.review_begin_time = res.data.data.review_begin_time
    //           a.review_end_time = res.data.data.review_end_time
    //           a.table = res.data.data.table
    //           if (res.data.data.type === 'SINGLE_COMPETITION') a.type = 0
    //           else a.type = 1
    //           a.cover = res.data.data.cover
    //           a.user_code = res.data.data.user_code
    //           a.submit_begin_time = res.data.data.submit_begin_time
    //           a.submit_end_time = res.data.data.submit_end_time
    //           return a
    //         })
    //       } else {
    //         Navigate(-1)
    //         setTimeout(() => {
    //           notification.error({
    //             message: '😭️ 获取活动信息失败',
    //             description: res.data.data.errMsg,
    //             top: 20,
    //             placement: 'top',
    //           })
    //         }, 100)
    //       }
    //     })
    //     .catch((error) => {
    //       Navigate(-1)
    //       setTimeout(() => {
    //         notification.error({
    //           message: '😭️ 获取活动信息失败',
    //           top: 20,
    //           placement: 'top',
    //         })
    //       }, 100)
    //     })
    // } else {
    setCompetitionInfo((pre) => {
      const a = { ...pre }
      a.table = tempelate[0]
      return a
    })
    // }
  }, [])

  // useEffect(() => {
  //   console.log('cober' + cover)
  //   console.log(competitionInfo.cover)
  // })
  useEffect(() => {
    console.log(competitionInfo.is_review)
  })

  return (
    <div>
      <TopBar />
      <div className="activity-create-header">
        {/* <h1 id="activity-create-header-title">{competitionId === -1 ? '创建活动' : '修改活动'}</h1> */}

        {currentStep === 0 ? (
          <div className="activity-create-header-buttons">
            {/* //todo 发布时校验比赛简介字数大于100 */}
            {/* {competitionId === -1 ? (
            <></>
          ) : (
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
          )} */}
            <div className="activity-create-header-buttons-post-cancel">
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
        ) : (
          <div className="activity-create-button-post-whiteList">
            <div className="whiteList-compelete-button">
              <Button type="primary" onClick={postWhiteList}>
                完成
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="activity-create-content">
        <div className="activity-create-steps">
          <Steps size="small" current={currentStep} direction="vertical">
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
                  defaultValue={location.state ? -1 : 0}
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
                  {preSchema === null ? <></> : <Option value={-1}>不修改</Option>}
                </Select>
              </div>
            </div>
            <div className="activity-create-type">
              <span id="activity-create-type">比赛类型</span>
              <Radio.Group onChange={onTypeChange} value={competitionInfo.type}>
                <Radio value={0}>单人</Radio>
                <Radio value={1}>团队</Radio>
              </Radio.Group>
              <span id="activity-create-type-tips">（不可超过8人）</span>
              {/* 当比赛类型选中团队时才出现 */}
              {competitionInfo.type === 1 ? (
                <Select
                  showSearch
                  defaultValue="8"
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
              {competitionInfo.is_review === 1 ? (
                <div className="activity-create-reviewer-setting-default-code">
                  <span id="activity-create-reviewer-setting-default-code">默认审核者</span>
                  <Input
                    className="first"
                    placeholder="审核者学号"
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
              ) : (
                <>
                  <div style={{ width: '330px' }}>如需添加审核者请点击左方按钮</div>
                </>
              )}
              <div className="activity-create-reviewer-setting-default-change-number">
                <PlusSquareOutlined
                  className="manage-create-icon"
                  onClick={() => {
                    if (competitionInfo.is_review === 1) {
                      setReviewerNum(reviewerNum + 1)
                      setReviewSettings((pre) => {
                        const a = [...pre]
                        a.push({ key: -1, value: '' })
                        return a
                      })
                    } else if (competitionInfo.is_review === 0) {
                      setCompetitionInfo((pre) => {
                        const a = { ...pre }
                        a.is_review = 1
                        return a
                      })
                    }
                  }}
                />
                {reviewerNum === 1 ? (
                  competitionInfo.is_review === 1 ? (
                    <MinusSquareOutlined
                      className="manage-create-icon"
                      onClick={() => {
                        setCompetitionInfo((pre) => {
                          const a = { ...pre }
                          a.is_review = 0
                          return a
                        })
                      }}
                    />
                  ) : (
                    <></>
                  )
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
        </div>
          */}
          </div>
        ) : (
          <div className="whiteList-container-body">
            <WhiteListdetail
              fileList={fileList}
              checked={checked}
              handleFileChange={handleFileChange}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Create
