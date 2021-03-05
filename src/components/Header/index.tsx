import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Menu, Dropdown, Modal, Avatar } from 'antd'
import { LockOutlined, PoweroffOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import './index.less'
import ModifyPwd from './ModifyPwd'
import { showModifyPwdModal, hideModifyPwdModal, addTabPage } from '../../actions/home'
import { logout, postModifyPwd } from '../../actions/user'
import { getStorage } from '../../utils/storage'
import { KEYS } from '../../utils/authority'

function Header() {
  const dispatch = useDispatch()
  let { username, loading } = useSelector((s: any) => s.user)
  const { showModifyPwModal = false, notifyCount } = useSelector((s: any) => s.home)

  useEffect(() => {
    if (!username) {
      const uinfo = getStorage(KEYS.userInfo)
      if (uinfo) {
        username = uinfo.username
      }
    }
  }, [])

  const handleHideModify = () => {
    dispatch(hideModifyPwdModal())
  }

  const handleShowModify = () => {
    dispatch(showModifyPwdModal())
  }

  const handleExit = () => {
    Modal.confirm({
      title: '您是否确定退出系统？',
      onOk: () => {
        dispatch(logout())
      },
    })
  }

  const handleModifyPwdSubmit = (values: any) => {
    const params = {
      originPassword: values.spass,
      newPassword: values.npass,
    }
    dispatch(postModifyPwd(params))
  }

  const handleGoNotifyList = () => {
    dispatch(addTabPage({
      key: '/home/notify',
    }))
  }
  const userMenu = (
    <Menu>
      <Menu.Item onClick={handleShowModify}>
        <LockOutlined />
        修改密码
      </Menu.Item>
      <Menu.Item onClick={handleExit}>
        <PoweroffOutlined />
        退出
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/home" className="header-logo u-up-logo">
          <span className="logo-title">企业管理平台</span>
        </Link>
      </div>
      <div className="header-right">
        <div className="notify" onClick={handleGoNotifyList}>
          <Badge count={notifyCount}>
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: 'transparent' }}
            />
          </Badge>
        </div>
        <div className="usr-info">
          <Dropdown overlay={userMenu}>
            <div>
              <span>
                {username} <CaretDownOutlined />
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
      <Modal
        title="修改密码"
        visible={showModifyPwModal}
        footer={null}
        onCancel={handleHideModify}
      >
        {showModifyPwModal ? (
          <ModifyPwd
            onSubmit={handleModifyPwdSubmit}
            loading={loading}
          />
        ) : (
          <div style={{ height: '252px' }} />
        )}
      </Modal>
    </div>
  );
}

export default React.memo(Header)
