import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import React from 'react'
import { getLicense, uploadWork } from '../../../../api/user'

function Uploader(props: any) {
  const localProps: any = {
    accept: props.accept,
    maxCount: '1',
    onChange(info: any) {
      console.log('onChange', info)
    },
    customRequest(options: any) {
      // console.log('options', options)
      // const { onSuccess, onError, file, onProgress } = options
      // uploadWork(Number(props.competitionId), props.inputName, file, onProgress).then((res) => {
      //   console.log(res)
      //   if (res.data.errCode === null) {
      //     onSuccess(res, file)
      //     message.success({
      //       content: file.name + ' 上传成功',
      //     })
      //   }
      // })
      const temp = options.file as File
      getLicense(temp.name, props.inputName, props.competitionId as unknown as number).then(res => {
        console.log(res);
        const { onSuccess, file } = options
        console.log(res.data.data.url);
        fetch(res.data.data.url, {
          method: "put",
          body: temp
        }).then(_ => {
          onSuccess && onSuccess(res)
          message.success({
            content: (file as File).name + ' 上传成功',
          })
        })
      }).catch(err => {
        console.log(err);
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
