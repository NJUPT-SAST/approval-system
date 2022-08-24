import { Col, Space, Table, Button, Dropdown, Menu } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'

const DataTable: React.FC<any> = (props) => {
  return (
    <div className="manage-detail-list-content">
      <span className="manage-detail-list-content-index"> 1</span>
      <span className="manage-detail-list-content-fileName">测试 </span>
      <span className="manage-detail-list-content-judges">Dropdown</span>
      <span className="manage-detail-list-content-export">导出作品</span>
    </div>
    //     <Table
    //       dataSource={props.data}
    //       rowClassName={(record, index) => {
    //         //奇偶行不同样式
    //         return index % 2 === 0 ? 'manage-detail-list-odd' : 'manage-detail-list-even'
    //       }}
    //     >
    //       <Column title="序号" key="1" dataIndex="index" />
    //       <Column title="项目名称" key="2" dataIndex="fileName"></Column>
    //       <Column
    //         title="评委"
    //         key="3"
    //         dataIndex=""
    //         render={(_: any, record: any) => {
    //           return record.isAssignJudge === 1 ? (
    //             <Dropdown.Button overlay={menu} disabled icon={<UserOutlined />}>
    //               未分配
    //             </Dropdown.Button>
    //           ) : (
    //             <Dropdown.Button overlay={menu} icon={<UserOutlined />}>
    //               已分配
    //             </Dropdown.Button>
    //           )
    //         }}
    //       ></Column>
    //       <Column
    //         title="导出"
    //         key="4"
    //         dataIndex="export"
    //         render={() => {
    //           return <Button>导出</Button>
    //         }}
    //       />
    //     </Table>
  )
}

export default DataTable
