import React, { useState } from 'react'
import { Select, Input } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import classnames from 'classnames'

import './index.less'

export interface IPagination {
  onChange: Function,
  pageSize: number,
  pageNo: number,
  dataLength: number,
  pageList?: number[],
  showPageList?: boolean
}

export default function Pagination({ onChange, pageSize = 20, pageNo = 1, dataLength = 0, pageList = [10, 20, 30, 40, 50], showPageList = true }: IPagination) {
  const [jumpPageVal, setJumpPageVal] = useState('')

  const handleJumpPage = (e: any) => {
    if (e.keyCode === 13) {
      if (onChange && jumpPageVal !== '') {
        onChange(parseInt(jumpPageVal, 10), pageSize)
      }
    }
  }

  const hanldeJumpChange = (e: any) => {
    let val = e.target.value
    if (val) {
      if (!/^([0-9])+$/.test(val)) {
        return
      }
      const pageVal = parseInt(val, 10)
      if (pageVal < 0) {
        val = 1;
      }
    }
    setJumpPageVal(val)
  }

  const handlePageSizeChange = (e: any) => {
    if (onChange) {
      onChange(jumpPageVal || pageNo, e)
    }
  }

  const handleNextClick = () => {
    if (onChange) {
      onChange(pageNo + 1, pageSize)
    }
  }

  const handlePreClick = () => {
    if (onChange) {
      onChange(pageNo - 1, pageSize)
    }
  }
  const isLastPage = dataLength < pageSize
  const isFristPage = pageNo === 1
  const pages = pageList
  if (pageNo === 0 && isFristPage) {
    return null
  }
  return (
    <ul className="pagination-box ant-pagination">
      <li title="上一页" className=" ant-pagination-prev">
        <a
          className={classnames('ant-pagination-item-link', {
            'ant-pagination-disabled': isFristPage,
          })}
          onClick={!isFristPage ? handlePreClick : ()=>{}}
        >
          <LeftOutlined />
        </a>
      </li>
      <li
        title="1"
        className="ant-pagination-item ant-pagination-item-active"
      >
        <a>{pageNo}</a>
      </li>
      <li
        title="下一页"
        className=" ant-pagination-next"
        aria-disabled="false"
      >
        <a
          className={classnames('ant-pagination-item-link', {
            'ant-pagination-disabled': isLastPage,
          })}
          onClick={!isLastPage ? handleNextClick : ()=>{}}
        >
          <RightOutlined />
        </a>
      </li>
      <li className="ant-pagination-options">
        <div className="ant-pagination-options-quick-jumper">
          跳至
          <Input
            value={jumpPageVal}
            onChange={hanldeJumpChange}
            onKeyDown={handleJumpPage}
          />
          页
        </div>
      </li>
      {showPageList ? (
        <li className="ant-pagination-options">
          <Select
            className="ant-pagination-options-size-changer"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {pages.map(item => (
              <Select.Option key={`pageSizeList-${item}`} value={item}>
                {item} 条/页
              </Select.Option>
            ))}
          </Select>
        </li>
      ) : null}
    </ul>
  )
}
