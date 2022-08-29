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
  const [loading, setLoading] = useState(false)
  const [messageStatus, setMessageStatus] = useState('null')
  const [errCode, setErrCode] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const [competitionInfo, setCompetitionInfo] = useState({
    minParti: 1,
    maxParti: 1,
  })
  const navigate = useNavigate()
  const [curParti, setCurParti] = useState(1)
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
      select_numOfParti: {
        title: '参赛人数',
        type: 'number',
        widget: 'slider',
        displayType: 'column',
        description: '最少人数 ' + competitionInfo.minParti + ' ；最多人数 ' + competitionInfo.maxParti,
        required: true,
        placeholder: '',
        min: competitionInfo.minParti,
        max: competitionInfo.maxParti,
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
        },
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
      form.setValueByPath('leader', {
        name: localStorage.getItem('approval-system-name'),
        code: localStorage.getItem('approval-system-code'),
      })
      if (res.data.errCode !== 2003) {
        setTeamInfo({
          teamName: res.data.data.teamName,
          teamMember: res.data.data.teamMember,
        })
        form.setValueByPath('select_numOfParti', res.data.data.teamMember.length)
        setCurParti(res.data.data.teamMember.length)
        const newEle = generateForm(res.data.data.teamMember.length)
        newEle.forEach((element) => {
          setFormSchema((prev: any) => {
            return { ...prev, properties: { ...prev.properties, ...element } }
          })
        })
        form.setValueByPath('input_teamName', res.data.data.teamName)
        for (let i = 1; i <= res.data.data.teamMember.length - 1; i++) {
          const formName = 'parti' + i
          form.setValueByPath(formName, {
            name: res.data.data.teamMember[i].name,
            code: res.data.data.teamMember[i].code,
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
      setCompetitionInfo({
        maxParti: res.data.data.maxTeamMembers,
        minParti: res.data.data.minTeamMembers,
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
          select_numOfParti: {
            title: '参赛人数',
            type: 'number',
            widget: 'slider',
            displayType: 'column',
            description: '最少人数 ' + res.data.data.minTeamMembers + ' ；最多人数 ' + res.data.data.maxTeamMembers,
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
            },
          },
        },
      })
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
      // teamMember.push(formData.leader)
      for (let i = 1; i <= Number(formData.select_numOfParti) - 1; i++) {
        const formName = 'parti' + i
        teamMember.push(formData[formName])
      }
      console.log('teamName', teamName, 'teamMember', teamMember)
      signUp(Number(id), teamName, teamMember).then((res) => {
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
    console.log(values)
    if (values.select_numOfParti !== undefined) {
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
          select_numOfParti: {
            title: '参赛人数',
            type: 'number',
            widget: 'slider',
            displayType: 'column',
            description: '最少人数 ' + competitionInfo.minParti + ' ；最多人数 ' + competitionInfo.maxParti,
            required: true,
            placeholder: '',
            min: competitionInfo.minParti,
            max: competitionInfo.maxParti,
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
            },
          },
        },
      })
      const number = Number(values.select_numOfParti)
      setCurParti(number)
      console.log(number)
      const newEle = generateForm(number)
      newEle.forEach((element) => {
        setFormSchema((prev: any) => {
          return { ...prev, properties: { ...prev.properties, ...element } }
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
