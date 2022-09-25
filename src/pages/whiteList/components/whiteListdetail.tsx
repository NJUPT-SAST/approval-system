import React, { useState } from 'react'
import type { UploadProps } from 'antd'
import { Checkbox, Space, Upload, message } from 'antd'
import { CloudDownloadOutlined, InboxOutlined } from '@ant-design/icons'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const WhiteListdetail: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false)
  let postFile: any
  const onChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked)
  }
  const { Dragger } = Upload
  const uploadProps = {
    accept: '.csv, .xlsx, .xlx',
    customRequest: () => {
      postFile().then((res: any) => {
        console.log(res)
      })
    },
    maxCount: 1,
  }

  return (
    <>
      <div id="check-box">
        <Checkbox defaultChecked={checked} onChange={onChange}>
          添加报名白名单
        </Checkbox>
      </div>
      {/* <div className='whiteList-download'>
                <div className='whiteList-download-before'>
                    白名单文件:
                </div>
                <div className='whiteList-download-after'>
                    <Space><CloudDownloadOutlined /> 点击下载已上传白名单 </Space >
                </div>
            </div> */}
      {checked ? (
        <>
          <div className="whiteList-upload">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或者将文件拖入以上传文件</p>
              <p className="ant-upload-hint">仅支持上传单个文件，仅支持csv、xlsx、xlx格式</p>
            </Dragger>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
export default WhiteListdetail
