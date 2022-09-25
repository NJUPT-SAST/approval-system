import React, { useEffect, useState } from 'react'
import { Button, notification } from 'antd'
import TopBar from '../../components/TopBar'
import { editWhiteList } from '../../api/admin'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { UploadProps } from 'antd'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface'
import WhiteListdetail from './components/whiteListdetail'
import './index.scss'
// type WhiteListProps = {
//   competitionId: number
// }

function useMyLocation<T>() {
  return useLocation() as { state: T }
}
const WhiteList: React.FC = () => {
  const navigate = useNavigate()
  const {
    state: { competitionName, competitionId },
  } = useMyLocation<{ competitionName: string; competitionId: number }>()
  const [checked, setChecked] = useState<boolean>(false)
  const [fileList, setFileList] = useState<any>([])

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
            navigate(-1)
            setTimeout(() => {
              notification.success({
                message: '设置成功',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else {
            notification.error({
              message: '😭️ 设置失败',
              top: 20,
              placement: 'top',
            })
          }
        })
        .catch((err) => {
          notification.error({
            message: '😭️ 设置失败',
            top: 20,
            placement: 'top',
          })
        })
    } else if (checked && fileList.length !== 0)
      editWhiteList(competitionId, checked, fileList[0].originFileObj)
        .then((res) => {
          if (res.data.success) {
            navigate(-1)
            setTimeout(() => {
              notification.success({
                message: '设置成功',
                top: 20,
                placement: 'top',
              })
            }, 100)
          } else {
            notification.error({
              message: '😭️ 设置失败',
              top: 20,
              placement: 'top',
            })
          }
        })
        .catch((err) => {
          notification.error({
            message: '😭️ 设置失败',
            top: 20,
            placement: 'top',
          })
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
  return (
    <>
      <TopBar activity={competitionName}></TopBar>
      <div className="whiteList-bar">
        <div className="whiteList-compelete-button">
          <Button type="primary" onClick={postWhiteList}>
            完成
          </Button>
          <Button
            onClick={() => {
              navigate(-1)
            }}
          >
            {' '}
            取消{' '}
          </Button>
        </div>
      </div>

      <div className="whiteList-container">
        <div className="whiteList-something"></div>
        <div className="whiteList-container-body">
          <WhiteListdetail
            fileList={fileList}
            checked={checked}
            handleFileChange={handleFileChange}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  )
}
export default WhiteList
