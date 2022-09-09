import Button from 'antd/lib/button'
import { useState } from 'react'
import PDF from 'react-pdf-js'
import './index.scss'
type pdfdata = {
  url: any
}
const Pdf: React.FC<pdfdata> = (prop) => {
  const { url } = prop
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  //获取所有页
  const onDocumentComplete = (pages: number) => {
    setPage(pages)
  }
  //点击上一页
  const handlePrevious = () => {
    setPage(page - 1)
  }
  //点击下一页
  const handleNext = () => {
    setPage(page + 1)
  }
  return (
    <div>
      <div className="filePdf">
        <PDF
          file={url} //文件地址
          onDocumentComplete={onDocumentComplete}
          page={page} //文件页码
        />
      </div>

      <div className="filePdfFooter">
        {page === 1 ? null : (
          <Button type="primary" onClick={handlePrevious}>
            上一页
          </Button>
        )}

        <div className="filePdfPage">
          <span>第{page}页</span>/<span>共{pages}页</span>
        </div>
        {page === pages ? null : (
          <Button style={{ marginLeft: '10px' }} type="primary" onClick={handleNext}>
            下一页
          </Button>
        )}
      </div>
    </div>
  )
}
export default Pdf
