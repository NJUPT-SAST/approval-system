import React from 'react'
import type { UploadProps } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import { Checkbox, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

type WhiteListdetailProps = {
  fileList: any
  checked: boolean
  handleFileChange: (info: UploadChangeParam<UploadFile<any>>) => void
  onChange: (e: CheckboxChangeEvent) => void
}

const WhiteListdetail: React.FC<WhiteListdetailProps> = (props) => {
  const { fileList, checked, handleFileChange, onChange } = props
  const { Dragger } = Upload
  // const handleFileChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   if (info.file !== undefined) {
  //     setFileList([...info.fileList])
  //   }
  // }
  // const handleFileDrop = (e) => {
  //   console.log()
  // }
  // useEffect(() => {
  //   console.log(fileList)
  // })
  const uploadProps = {
    name: 'file',
    accept: '.csv, .xlsx, .xlx',
    fileList: fileList,
    showUploadList: true,
    beforeUpload: () => false,
    onChange: handleFileChange,
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
            <Dragger
              {...uploadProps}
              // name='file'
              // accept = '.csv, .xlsx, .xlx'
              // fileList={ fileList}
              // showUploadList={true}
              // onRemove = {()=>{setFileList([])}}
              // beforeUpload ={() => false}
              // onChange ={handleFileChange}
              // maxCount =  {1}
            >
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
