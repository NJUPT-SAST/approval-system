import { Button, message, UploadProps } from 'antd'
import FormRender, { useForm } from 'form-render'
import React, { Fragment, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompetitionInfo, getTeamInfo, getWorkSchema } from '../../api/user'
import TopBar from '../../components/TopBar'
import './index.scss'

function WorkDetail() {
  const { id } = useParams()
  const form = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const useGetWorkSchema = () => {
    const [schemaData, setSchemaData] = useState()
    useLayoutEffect(() => {
      getWorkSchema(Number(id)).then((res) => {
        // console.log(res)
        setSchemaData(res.data)
      })
    }, [])
    return schemaData
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
  }

  const uploadFileOnchange: UploadProps['onChange'] = (info: any) => {
    console.log(info)
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

  const schema: any = useGetWorkSchema()
  const localSchema: any = {
    type: 'object',
    labelWidth: 120,
    properties: {
      isstitp: {
        enum: ['a', 'b'],
        type: 'string',
        title: '是否为STITP项目',
        widget: 'radio',
        required: true,
        enumNames: ['是', '否'],
      },
      upload_1: {
        type: 'string:upload',
        title: '申报书',
        required: true,
        props: {
          maxCount: '1',
          onChange(info: any) {
            console.log(info)
          },
          customRequest(options: any) {
            console.log(options)
            const { onSuccess, onError, file, onProgress } = options
            const formData = new FormData()
            if (id !== undefined) {
              formData.append('id', id.toString())
            }
            formData.append('input', file)
          },
          headers: { Token: localStorage.getItem('token') },
        },
      },
      upload_2: { type: 'string:upload', title: '研究报告', required: true },
      upload_3: { type: 'string:upload', title: '作品简介书', required: true },
      workname: { type: 'string', props: {}, title: '作品名称', required: true },
      worktype: {
        enum: ['a', 'b', 'c', 'd'],
        type: 'string',
        title: '作品类别',
        widget: 'select',
        required: true,
        enumNames: ['自然科学类学术论文', '哲学社会科学类社会调查报告和学术论文', '科技发明制作A类', '科技发明制作B类'],
      },
      workintro: { type: 'string', props: {}, title: '作品简介', format: 'textarea', required: true },
    },
    displayType: 'column',
  }
  // console.log(schema)
  return (
    <div>
      <TopBar activity={competitionDetail.name} />
      <div className="work-detail-body">
        <div className="title">作品提交信息</div>
        <div className="work-detail-box">
          {schema !== undefined ? <FormRender debug form={form} schema={localSchema} onFinish={submitData} /> : <></>}
          <Button type="primary" onClick={form.submit}>
            提 交
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
