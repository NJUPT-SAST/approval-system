import { Button, message } from 'antd'
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
        console.log(res)
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

  const schema: any = useGetWorkSchema()
  console.log(schema)
  return (
    <div>
      <TopBar activity={competitionDetail.name} />
      <div className="work-detail-body">
        <div className="title">作品提交信息</div>
        <div className="work-detail-box">
          {schema !== undefined ? <FormRender form={form} schema={schema.data} onFinish={submitData} /> : <></>}
          <Button type="primary" onClick={form.submit}>
            提 交
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkDetail
