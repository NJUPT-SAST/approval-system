import { Dropdown, Menu, message, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { exportWorkFile } from '../../../../api/admin'
import React from 'react'

const DataTable: React.FC<any> = (props) => {
  const menu = () => {
    if (value.isAssignJudge === 1) {
      const tempArray: any = []
      for (let i = 0; i < value.judges.length; i++) {
        tempArray.push({
          label: value.judges[i],
          key: i,
          icon: <UserOutlined />,
        })
      }
      return <Menu items={tempArray} />
    } else return <Menu></Menu>
  }
  const { value, index, pageState } = props
  return (
    <div className={index % 2 === 0 ? 'manage-detail-list-content-odd' : 'manage-detail-list-content-even'}>
      <div className="manage-detail-list-content">
        <span style={{ width: '10%' }}> {(pageState.pageNumber - 1) * pageState.pageSize + index + 1}</span>
        <span style={{ width: '45%' }}>{value.fileName} </span>
        <span style={{ width: '22%' }}>
          {value.isAssignJudge === 1 ? (
            <Dropdown.Button overlay={menu} icon={<UserOutlined />}>
              已分配
            </Dropdown.Button>
          ) : (
            <Dropdown.Button overlay={menu} disabled icon={<UserOutlined />}>
              未分配
            </Dropdown.Button>
          )}
        </span>
        <div
          style={{ width: '22%', color: 'rgba(42, 130, 228, 1)', cursor: 'pointer' }}
          onClick={() => {
            notification.info({
              message: '导出中，请稍等',
              duration: 200,
              key: 'loading',
              placement: 'top',
            })
            exportWorkFile(value.comId, value.userCode)
              .then((res) => {
                if (res.status === 200) {
                  const blob = new Blob([res.data], { type: 'application/zip' })
                  const downloadElement = document.createElement('a')
                  const href = window.URL.createObjectURL(blob) //创建下载的链接
                  downloadElement.href = href
                  downloadElement.download = '项目' + value.fileName + '的附件.zip' //下载后文件名
                  document.body.appendChild(downloadElement)
                  downloadElement.click() //点击下载
                  document.body.removeChild(downloadElement) //下载完成移除元素
                  window.URL.revokeObjectURL(href) //释放掉blob对象
                  setTimeout(() => {
                    notification.success({
                      message: '😸️ 导出成功',
                      description: '作品已成功导出',
                      top: 20,
                      key: 'loading',
                      placement: 'top',
                    })
                  }, 100)
                } else {
                  setTimeout(() => {
                    notification.error({
                      message: '😭️ 导出失败',
                      description: '作品导出失败',
                      top: 20,
                      key: 'loading',
                      placement: 'top',
                    })
                  }, 100)
                }

              })
              .catch((error) => {
                notification.error({
                  message: '😭️ 请求失败',
                  top: 20,
                  key: 'loading',
                  placement: 'top',
                })
                return
              })
          }}
        >
          导出
        </div>
      </div>
    </div>
  )
}

export default DataTable
