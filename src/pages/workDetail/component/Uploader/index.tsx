import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import React from 'react'
import { uploadWork } from '../../../../api/user'

function Uploader(props: any) {
  const localProps: any = {
    accept: props.accept,
    maxCount: '1',
    onChange(info: any) {
      console.log('onChange', info)
    },
    customRequest(options: any) {
      console.log('options', options)
      const { onSuccess, onError, file, onProgress } = options
      uploadWork(Number(props.competitionId), props.inputName, file, onProgress).then((res) => {
        console.log(res)
        if (res.data.errCode === null) {
          onSuccess(res, file)
          message.success({
            content: file.name + ' 上传成功',
          })
        }
      })
    },
    headers: { Token: localStorage.getItem('approval-system-token') },
  }
  return (
    <Upload {...localProps}>
      <Button icon={<UploadOutlined />}>点击上传文件</Button>
    </Upload>
  )
}

export default Uploader
