import { Button, message, Result } from 'antd'
import FormRender, { useForm } from 'form-render'
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompetitionInfo, getCompetitionSignInfo, getTeamInfo, signUp } from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

function Register() {
  const form = useForm()
  const { id } = useParams()
  const [messageSent, setMessageSent] = useState(false)
  const [messageStatus, setMessageStatus] = useState('null')
  const [loading, setLoading] = useState(false)
  const [errCode, setErrCode] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const [competitionInfo, setCompetitionInfo] = useState({
    minParti: 1,
    maxParti: 1,
    isTeam: true,
  })
  const navigate = useNavigate()
  const [curParti, setCurParti] = useState(1)
  const [curTeacher, setCurTeacher] = useState(0)
  const [teamInfo, setTeamInfo] = useState({})
  const [formSchema, setFormSchema] = useState<any>({
    type: 'object',
    labelWidth: 151,
    displayType: 'column',
    properties: {
      input_teamName: {
        title: '队伍名称',
        type: 'string',
        displayType: 'column',
        required: true,
        labelWidth: 0,
        props: {},
      },
      listOfTeacher: {
        type: 'object',
        properties: {
          select_numOfTeacher: {
            title: '指导老师人数',
            type: 'number',
            widget: 'slider',
            displayType: 'column',
            description: '最多人数 ' + 5,
            required: true,
            placeholder: '',
            min: 0,
            max: 5,
            default: curTeacher,
          },
        }
      },
      listOfParti: {
        type: 'object',
        properties: {
          select_numOfParti: {
            title: '队员人数',
            type: 'number',
            widget: 'slider',
            displayType: 'column',
            description: '最少人数 ' + competitionInfo.minParti + ' ；最多人数 ' + 15,
            required: true,
            placeholder: '',
            min: competitionInfo.minParti,
            max: 15,
            default: curParti,
          },
          leader: {
            title: '队长信息',
            type: 'object',
            displayType: 'column',
            description: '队长信息已自动填写',
            properties: {
              name: {
                title: '姓名',
                type: 'string',
                readOnly: true,
                props: {},
              },
              code: {
                title: '学号',
                type: 'string',
                readOnly: true,
                props: {},
              },
              // college: {
              //   title: '学院',
              //   type: 'string',
              //   readOnly: true,
              //   props: {},
              // },
              // major: {
              //   title: '专业',
              //   type: 'string',
              //   readOnly: true,
              //   props: {},
              // },
              contact: {
                title: '联系方式',
                type: 'string',
                readOnly: true,
                props: {},
              }
            },
          },
        }
      },
    },
  })
  const storeTeamInfo = () => {
    setLoading(true)
    message.loading({
      content: '🤔️ 正在获取已保存信息，请稍候',
      key: 'loading',
      duration: 50,
    })
    getTeamInfo(Number(id)).then((res) => {
      // console.log(res)
      form.setValueByPath('listOfParti.leader', {
        name: localStorage.getItem('approval-system-name'),
        code: localStorage.getItem('approval-system-code'),
        college: localStorage.getItem('approval-system-college'),
        major: localStorage.getItem('approval-system-major'),
        contact: localStorage.getItem('approval-system-contact'),
      })
      if (res.data.errCode !== 2003) {
        setTeamInfo({
          teamName: res.data.data.teamName,
          teamMember: res.data.data.teamMember,
          teacherMember: res.data.data.teacherMember,
        })
        form.setValueByPath('listOfParti.select_numOfParti', res.data.data.teamMember.length)
        setCurParti(res.data.data.teamMember.length)
        const newEle = generateForm(res.data.data.teamMember.length)
        newEle.forEach((element) => {
          setFormSchema((prev: any) => {
            return { ...prev, properties: { ...prev.properties, listOfParti: { ...prev.properties.listOfParti, properties: { ...prev.properties.listOfParti.properties, ...element } }, listOfTeacher: { ...prev.properties.listOfTeacher } } }
          })
        })
        form.setValueByPath('input_teamName', res.data.data.teamName)
        for (let i = 1; i <= res.data.data.teamMember.length - 1; i++) {
          const formName = 'parti' + i
          form.setValueByPath('listOfParti.' + formName, {
            name: res.data.data.teamMember[i].name,
            code: res.data.data.teamMember[i].code,
            college: res.data.data.teamMember[i].college,
            major: res.data.data.teamMember[i].major,
            contact: res.data.data.teamMember[i].contact,
          })
        }
        form.setValueByPath('listOfTeacher.select_numOfTeacher', res.data.data.teacherMember.length)
        setCurTeacher(res.data.data.teacherMember.length)
        const newEle2 = generateTeacherForm(res.data.data.teacherMember.length)
        newEle2.forEach((element) => {
          setFormSchema((prev: any) => {
            return { ...prev, properties: { ...prev.properties, listOfParti: { ...prev.properties.listOfParti }, listOfTeacher: { ...prev.properties.listOfTeacher, properties: { ...prev.properties.listOfTeacher.properties, ...element } } } }
          })
        })
        for (let i = 1; i <= res.data.data.teacherMember.length; i++) {
          const formName = 'teacher' + i
          form.setValueByPath('listOfTeacher.' + formName, {
            name: res.data.data.teacherMember[i - 1].name,
            code: res.data.data.teacherMember[i - 1].code,
          })
        }
        setLoading(false)
        message.success({
          content: '😸️ 信息加载成功',
          key: 'loading',
        })
      } else if (res.data.errMsg === '您还未报名该比赛') {
        setLoading(false)
        message.info({
          content: '💡️ 请填写比赛信息',
          key: 'loading',
        })
      } else {
        setLoading(false)
        message.error({
          content: '🙀️ 信息加载错误，请联系管理员',
          key: 'loading',
        })
      }
    })
  }
  useEffect(() => {
    getCompetitionSignInfo(Number(id)).then((res) => {
      console.log(res)
      if (!res.data.data.isTeam) {
        setCompetitionInfo({
          maxParti: 1,
          minParti: 1,
          isTeam: false,
        })
        setFormSchema({
          type: 'object',
          labelWidth: 151,
          displayType: 'column',
          properties: {
            leader: {
              title: '个人信息',
              type: 'object',
              displayType: 'column',
              description: '信息已自动填写, 有误请到我的帐号修改',
              properties: {
                name: {
                  title: '姓名',
                  type: 'string',
                  readOnly: true,
                  props: {},
                },
                code: {
                  title: '学号',
                  type: 'string',
                  readOnly: true,
                  props: {},
                },
                // college: {
                //   title: '学院',
                //   type: 'string',
                //   readOnly: true,
                //   props: {},
                // },
                // major: {
                //   title: '专业',
                //   type: 'string',
                //   readOnly: true,
                //   props: {},
                // },
                contact: {
                  title: '联系方式',
                  type: 'string',
                  readOnly: true,
                  props: {},
                }
              },
            },
          },
        })
      } else {
        setCompetitionInfo({
          maxParti: res.data.data.maxTeamMembers,
          minParti: res.data.data.minTeamMembers,
          // 待改动 maxTeacher
          // 待改动 minTeacher
          isTeam: true,
        })
        setFormSchema({
          type: 'object',
          labelWidth: 151,
          displayType: 'column',
          properties: {
            input_teamName: {
              title: '队伍名称',
              type: 'string',
              displayType: 'column',
              required: true,
              labelWidth: 0,
              props: {},
            },
            listOfTeacher: {
              type: 'object',
              properties: {
                select_numOfTeacher: {
                  title: '指导老师人数',
                  type: 'number',
                  widget: 'slider',
                  displayType: 'column',
                  description: '最多人数 ' + 5,
                  required: true,
                  placeholder: '',
                  min: 0, // 待改动
                  max: 5, // 待改动
                  default: curTeacher,
                },
              }
            },
            listOfParti: {
              type: 'object',
              properties: {
                select_numOfParti: {
                  title: '队员人数',
                  type: 'number',
                  widget: 'slider',
                  displayType: 'column',
                  description: '最少人数 ' + competitionInfo.minParti + ' ；最多人数 ' + 15,
                  required: true,
                  placeholder: '',
                  min: res.data.data.minTeamMembers,
                  max: res.data.data.maxTeamMembers,
                  default: curParti,
                },
                leader: {
                  title: '队长信息',
                  type: 'object',
                  displayType: 'column',
                  description: '队长信息已自动填写',
                  properties: {
                    name: {
                      title: '姓名',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    },
                    code: {
                      title: '学号',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    },
                    // college: {
                    //   title: '学院',
                    //   type: 'string',
                    //   readOnly: true,
                    //   props: {},
                    // },
                    // major: {
                    //   title: '专业',
                    //   type: 'string',
                    //   readOnly: true,
                    //   props: {},
                    // },
                    contact: {
                      title: '联系方式',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    }
                  },
                },
              }
            },
          },
        })
      }
    })
    storeTeamInfo()
  }, [])
  // console.log(teamInfo)
  const generateForm = (number: number) => {
    const participants: any[] = []
    for (let i = 1; i <= number - 1; i++) {
      const formName = 'parti' + i
      const inputName = 'name'
      const inputName2 = 'code'
      const inputName3 = 'college'
      const inputName4 = 'major'
      const inputName5 = 'contact'
      participants.push({
        [formName]: {
          title: '队员' + i + '信息',
          type: 'object',
          displayType: 'column',
          properties: {
            [inputName]: {
              title: '姓名',
              type: 'string',
              required: true,
              props: {},
            },
            [inputName2]: {
              title: '学号',
              type: 'string',
              required: true,
              rules: [
                {
                  pattern: /^([BPQF](1[89]|2[0-6])(0[0-9]|1[0-9])([0-2]\d|3[01])\d{2}|\d{11})|([0-9]{10})$/,
                  message: '请输入正确的学号',
                },
              ],
              props: {},
            },
            // [inputName3]: {
            //   title: '学院',
            //   type: 'string',
            //   widget: 'select',
            //   required: true,
            //   props: {
            //     options: [
            //       {
            //         "label": "通信与信息工程学院",
            //         "value": "通信与信息工程学院"
            //       },
            //       {
            //         "label": "电子与光学工程学院、柔性电子（未来技术）学院",
            //         "value": "电子与光学工程学院、柔性电子（未来技术）学院"
            //       },
            //       {
            //         "label": "集成电路科学与工程学院（产教融合学院）",
            //         "value": "集成电路科学与工程学院（产教融合学院）"
            //       },
            //       {
            //         "label": "计算机学院、软件学院、网络空间安全学院",
            //         "value": "计算机学院、软件学院、网络空间安全学院"
            //       },
            //       {
            //         "label": "自动化学院",
            //         "value": "自动化学院"
            //       },
            //       {
            //         "label": "人工智能学院",
            //         "value": "人工智能学院"
            //       },
            //       {
            //         "label": "材料科学与工程学院",
            //         "value": "材料科学与工程学院"
            //       },
            //       {
            //         "label": "化学与生命科学学院",
            //         "value": "化学与生命科学学院"
            //       },
            //       {
            //         "label": "物联网学院",
            //         "value": "物联网学院"
            //       },
            //       {
            //         "label": "理学院",
            //         "value": "理学院"
            //       },
            //       {
            //         "label": "现代邮政学院、智慧交通学院",
            //         "value": "现代邮政学院、智慧交通学院"
            //       },
            //       {
            //         "label": "数字媒体与设计艺术学院",
            //         "value": "数字媒体与设计艺术学院"
            //       },
            //       {
            //         "label": "管理学院",
            //         "value": "管理学院"
            //       },
            //       {
            //         "label": "经济学院",
            //         "value": "经济学院"
            //       },
            //       {
            //         "label": "马克思主义学院",
            //         "value": "马克思主义学院"
            //       },
            //       {
            //         "label": "社会与人口学院、社会工作学院",
            //         "value": "社会与人口学院、社会工作学院"
            //       },
            //       {
            //         "label": "外国语学院",
            //         "value": "外国语学院"
            //       },
            //       {
            //         "label": "教育科学与技术学院",
            //         "value": "教育科学与技术学院"
            //       },
            //       {
            //         "label": "贝尔英才学院",
            //         "value": "贝尔英才学院"
            //       },
            //       {
            //         "label": "波特兰学院",
            //         "value": "波特兰学院"
            //       }
            //     ]
            //   },
            // },
            // [inputName4]: {
            //   title: '专业',
            //   type: 'string',
            //   required: true,
            //   props: {},
            // },
            [inputName5]: {
              title: '联系方式（手机号码）',
              type: 'string',
              required: true,
              rules: [
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: '请输入正确的手机号码',
                },
              ],
              props: {},
            }
          },
        },
      })
    }
    return participants
  }

  const generateTeacherForm = (number: number) => {
    const participants: any[] = []
    for (let i = 1; i <= number; i++) {
      const formName = 'teacher' + i
      const inputName = 'name'
      const inputName2 = 'code'
      participants.push({
        [formName]: {
          title: '指导老师' + i + '信息',
          type: 'object',
          displayType: 'column',
          properties: {
            [inputName]: {
              title: '姓名',
              type: 'string',
              required: true,
              props: {},
            },
            [inputName2]: {
              title: '工号',
              type: 'string',
              required: true,
              rules: [
                {
                  // pattern: /^([BPQF](1[89]|2[0-6])(0[0-9]|1[0-7])([0-2]\d|3[01])\d{2}|\d{11})/,
                  message: '请输入正确的工号',
                },
              ],
              props: {},
            },
          },
        },
      })
    }
    return participants
  }

  /**
   * 表单提交的反应
   * @param formData 表单数据
   * @param errors 错误
   */
  const onFinish = (formData: any, errors: any) => {
    console.log('formData:', formData, 'errors', errors)
    if (errors.length === 0) {
      setLoading(true)
      message.loading({
        content: '🤔️ 信息提交中',
        key: 'loading',
        duration: 50,
      })
      const teamName = formData.input_teamName
      const teamMember = []
      const teacherMember = []
      // teamMember.push(formData.leader)
      for (let i = 1; i <= Number(formData.listOfParti.select_numOfParti) - 1; i++) {
        const formName = 'parti' + i
        teamMember.push(formData.listOfParti[formName])
      }
      for (let i = 1; i <= Number(formData.listOfTeacher.select_numOfTeacher); i++) {
        const formName = 'teacher' + i
        teacherMember.push(formData.listOfTeacher[formName])
      }
      console.log('teamName', teamName, 'teamMember', teamMember, 'teacherMember', teacherMember)
      signUp(Number(id), teamName, teamMember, teacherMember).then((res) => {
        console.log(res)
        setMessageSent(true)
        if (res.data.success === true) {
          setMessageStatus('success')
          message.success({
            content: '😸️ 信息提交成功',
            key: 'loading',
          })
        } else {
          setMessageStatus('error')
          setErrCode(res.data.errCode)
          setErrMsg(res.data.errMsg)
          message.error({
            content: '🙀️ 信息好像有点问题哦，检查下吧',
            key: 'loading',
            duration: 3,
          })
        }
      })
    }
  }
  /**
   * 通过监听表单的改变来实现动态表单
   * @param values 改变的值
   */
  const valueChangeAction = (values: any) => {
    console.log('值更新', values)
    const select_numOfTeacher = 'listOfTeacher.select_numOfTeacher'
    const select_numOfParti = 'listOfParti.select_numOfParti'
    if (values[select_numOfParti] !== undefined) {
      setFormSchema((prev: any) => {
        return {
          type: 'object',
          labelWidth: 151,
          displayType: 'column',
          properties: {
            input_teamName: {
              title: '队伍名称',
              type: 'string',
              displayType: 'column',
              required: true,
              labelWidth: 0,
              props: {},
            },
            listOfTeacher: { ...prev.properties.listOfTeacher },
            listOfParti: {
              type: 'object',
              properties: {
                select_numOfParti: {
                  title: '队员人数',
                  type: 'number',
                  widget: 'slider',
                  displayType: 'column',
                  description: '最少人数 ' + competitionInfo.minParti + ' ；最多人数 ' + 15,
                  required: true,
                  placeholder: '',
                  min: competitionInfo.minParti,
                  max: 15,
                  default: curParti,
                },
                leader: {
                  title: '队长信息',
                  type: 'object',
                  displayType: 'column',
                  description: '队长信息已自动填写',
                  properties: {
                    name: {
                      title: '姓名',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    },
                    code: {
                      title: '学号',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    },
                    // college: {
                    //   title: '学院',
                    //   type: 'string',
                    //   readOnly: true,
                    //   props: {},
                    // },
                    // major: {
                    //   title: '专业',
                    //   type: 'string',
                    //   readOnly: true,
                    //   props: {},
                    // },
                    contact: {
                      title: '联系方式',
                      type: 'string',
                      readOnly: true,
                      props: {},
                    }
                  },
                },
              }
            },
          },
        }
      })
      const number = Number(values[select_numOfParti])
      setCurParti(number)
      console.log(number);
      const newEle = generateForm(number)
      newEle.forEach((element) => {
        setFormSchema((prev: any) => {
          return { ...prev, properties: { ...prev.properties, listOfParti: { ...prev.properties.listOfParti, properties: { ...prev.properties.listOfParti.properties, ...element } }, listOfTeacher: { ...prev.properties.listOfTeacher } } }
        })
      })
    }
    if (values[select_numOfTeacher] !== undefined) {
      setFormSchema((prev: any) => {
        return {
          type: 'object',
          labelWidth: 151,
          displayType: 'column',
          properties: {
            input_teamName: {
              title: '队伍名称',
              type: 'string',
              displayType: 'column',
              required: true,
              labelWidth: 0,
              props: {},
            },
            listOfTeacher: {
              type: 'object',
              properties: {
                select_numOfTeacher: {
                  title: '指导老师人数',
                  type: 'number',
                  widget: 'slider',
                  displayType: 'column',
                  description: '最多人数 ' + 5,
                  required: true,
                  placeholder: '',
                  min: 0, // 待改动
                  max: 5, // 待改动
                  default: curTeacher,
                },
              }
            },
            listOfParti: { ...prev.properties.listOfParti },
          },
        }
      })
      const number2 = Number(values[select_numOfTeacher])
      console.log(number2);
      number2 && setCurTeacher(number2)
      const newEle2 = generateTeacherForm(number2)
      number2 && newEle2.forEach((element) => {
        setFormSchema((prev: any) => {
          return { ...prev, properties: { ...prev.properties, listOfParti: { ...prev.properties.listOfParti }, listOfTeacher: { ...prev.properties.listOfTeacher, properties: { ...prev.properties.listOfTeacher.properties, ...element } } } }
        })
      })
    }
  }
  const goBackToActivity = () => {
    navigate('/activity/' + id)
  }
  const editAgain = () => {
    setMessageSent(false)
    storeTeamInfo()
  }
  const goBackToRegisterDetail = () => {
    navigate('/activity/' + id + '/register-detail')
  }
  // // console.log(formSchema)
  return (
    <div>
      <TopBar activity="“挑战杯”创新创业大赛" />
      <div className="activity-register-body">
        <div className="title">报名</div>
        <div className="activity-register-box">
          {messageSent === false ? (
            <Fragment>
              <FormRender
                form={form}
                schema={formSchema}
                onFinish={onFinish}
                onValuesChange={(values) => valueChangeAction(values)}
                style={{ maxWidth: '600px' }}
                disabled={loading}
              />
              <Button
                type="primary"
                onClick={form.submit}
                loading={loading}
                disabled={loading}
                style={{ marginTop: '2rem' }}
              >
                提交
              </Button>
            </Fragment>
          ) : messageStatus === 'success' ? (
            <Result
              status="success"
              title="😄️ 信息提交成功"
              subTitle="你的报名信息已提交，祝你比赛顺利"
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Register
