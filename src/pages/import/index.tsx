import { Button, Table, Tag, Upload, message } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
// import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import { useEffect, useRef, useState } from "react";


async function generateExcelFile() {
    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet([
        ['学号', '姓名']
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // 创建并设置下载链接
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template.xlsx';

    // 触发下载
    link.click();

    // 清理链接对象
    URL.revokeObjectURL(url);
}

async function downloadExcelFile(data: any) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['账号', '密码']
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    for (let index = 0; index < data.length; index++) {
        const rowData = [data[index].code, data[index].password];
        const rowIndex = index + 2; // 从第二行开始写入数据

        XLSX.utils.sheet_add_aoa(worksheet, [rowData], { origin: `A${rowIndex}` });
    }

    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

    // 创建并设置下载链接
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template.xlsx';

    // 触发下载
    link.click();

    // 清理链接对象
    URL.revokeObjectURL(url);
}

const Import = () => {

    const fileTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
    ];
    const [data, setData] = useState<any>();
    const buttonRef = useRef(null)

    const props: UploadProps = {
        name: 'file',
        action: `api/review/import?depId=${1}`,
        headers: {
            authorization: 'authorization-text',
            token: localStorage.getItem("approval-system-token") as string,
            'Response-Type': 'blob'
        }
    };

    const handleUploadChange = (info: any) => {

        const { status, response } = info.file;
        if (status === 'done' && response.success === true) {
            console.log(response.data);
            setData(response.data)
            downloadExcelFile(response.data)
        } else if (response) {
            // 上传失败
            console.log(response.errMsg);
            message.error(response.errMsg);
        }
    };

    // useEffect(() => {
    //     downloadExcelFile(data)
    // }, [data])


    const columns = [
        {
            title: '账号',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
    ];


    const downloadFile = (fileData: Blob) => {
        console.log(fileData);
        // const blob = new Blob([fileData]);
        const downloadUrl = window.URL.createObjectURL(fileData);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'file.xlsx'; // 设置下载的文件名
        link.click();
        URL.revokeObjectURL(downloadUrl);
    };





    return <div style={{ display: "flex", justifyContent: "center" }}><div style={{ width: "90%", backgroundColor: "white", marginTop: "5%", padding: "30px" }}>
        <h1 style={{ fontSize: "24px" }}>一键从Excel导入账号</h1>
        <Upload  {...props} onChange={handleUploadChange} accept={fileTypes.join(',')}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
        <Button style={{ marginTop: "10px" }} onClick={() => generateExcelFile()}>下载模板</Button>
        <br /><br /><br />
        <Tag color="red" >请即使导出excel，否则表格里面的数据会丢失</Tag>
        <Table dataSource={data} columns={columns} />
        <Button onClick={() => downloadExcelFile(data)} ref={buttonRef}>从表格导出Excel</Button>
    </div></div>
}

export default Import