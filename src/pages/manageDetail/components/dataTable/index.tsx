import { Dropdown, Menu, notification } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { downLordFile } from '../../../../api/public'
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
        <span className="manage-detail-list-content-index">
          {' '}
          {(pageState.pageNumber - 1) * pageState.pageSize + index + 1}
        </span>
        <span className="manage-detail-list-content-fileName">{value.fileName} </span>
        <span className="manage-detail-list-content-judges">
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
        <span
          className="manage-detail-list-content-export"
          onClick={() => {
            downLordFile(value.fileId).then((res) => {
              const blob = new Blob([res.data])
              const downloadElement = document.createElement('a')
              const href = window.URL.createObjectURL(blob) //创建下载的链接
              downloadElement.href = href
              downloadElement.download = '作品' + value.fileName + '.zip' //下载后文件名
              document.body.appendChild(downloadElement)
              downloadElement.click() //点击下载
              document.body.removeChild(downloadElement) //下载完成移除元素
              window.URL.revokeObjectURL(href) //释放掉blob对象
              setTimeout(() => {
                notification.success({
                  message: '😸️ 导出成功',
                  description: '作品已成功导出',
                  top: 20,
                  placement: 'top',
                })
              }, 100)
            })
          }}
        >
          导出
        </span>
      </div>
    </div>
  )
}

export default DataTable
