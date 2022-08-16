import { Button } from 'antd'
import FormRender, { useForm } from 'form-render'
import React from 'react'
import TopBar from '../../components/TopBar'
import './index.scss'

const formSchema: any = {
  type: 'object',
  labelWidth: 120,
  displayType: 'row',
  properties: {
    participant: {
      title: '参赛者信息',
      type: 'object',
      displayType: 'row',
      properties: {
        input_Dw7Raa: {
          title: '姓名',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1': {
          title: '学号',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1_lmwVtk': {
          title: '专业',
          type: 'string',
          props: {},
        },
        select_U8xHtg: {
          title: '学院',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          widget: 'select',
        },
        select_U8xHtg_kLoBF5: {
          title: '年级',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          widget: 'select',
        },
        input_WYffls: {
          title: '电话',
          type: 'string',
          props: {},
        },
      },
    },
    'co-participant': {
      title: '队员信息',
      type: 'object',
      properties: {
        input_Dw7Raa_O9gfCX: {
          title: '姓名',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1_XcaZ-c': {
          title: '学号',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1_lmwVtk_RbFZHj': {
          title: '专业',
          type: 'string',
          props: {},
        },
        select_U8xHtg_irAkhJ: {
          title: '学院',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          widget: 'select',
        },
        select_U8xHtg_kLoBF5_PpInU5: {
          title: '年级',
          type: 'string',
          enum: ['a', 'b', 'c'],
          enumNames: ['早', '中', '晚'],
          widget: 'select',
        },
        input_WYffls_ysQiXZ: {
          title: '电话',
          type: 'string',
          props: {},
        },
      },
    },
    teacher: {
      title: '指导老师信息',
      type: 'object',
      properties: {
        input_Dw7Raa_O9gf: {
          title: '姓名',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1_X-c': {
          title: '工号',
          type: 'string',
          props: {},
        },
        input_Dw7Raa_pZ1_lmwVtk_RbFZHj: {
          title: '单位',
          type: 'string',
          props: {},
        },
        'input_Dw7Raa_pX-9Z1_lmwVtk_RbFZHj_fV7RAR': {
          title: '职位',
          type: 'string',
          props: {},
        },
        input_WYfflysQiXZ: {
          title: '电话',
          type: 'string',
          props: {},
        },
      },
    },
  },
}

function Register() {
  const form = useForm()
  const onFinish = (formData: any, errors: any) => {
    console.log('formData:', formData, 'errors', errors)
  }
  return (
    <div>
      <TopBar activity="“挑战杯”创新创业大赛" />
      <div className="activity-register-body">
        <div className="title">报名</div>
        <div className="activity-register-box">
          <FormRender form={form} schema={formSchema} onFinish={onFinish} style={{ maxWidth: '600px' }} />
          <Button type="primary" onClick={form.submit}>
            提交
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Register
