import React from 'react'
import { Button } from 'antd'
// import ImgUpload from '../../../../components/ImageBox'
import Pagination from '../../../../components/Pagination'
// import imgs from '../../../../assets/login-bg.png'

function CompanyInfo() {
  return (
    <div>
      <Button>萨达是的冯</Button>
      {/* <ImgUpload 
        title="行驶证正本"
        src={imgs}
        isQualified={true}
        reason={1}
      ></ImgUpload> */}
      <Pagination
        onChange={() => {}}
        pageSize={20}
        pageNo={1}
        dataLength={100}
      />
    </div>
  )
}
export default CompanyInfo