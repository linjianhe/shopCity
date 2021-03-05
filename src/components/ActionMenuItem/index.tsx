import React from 'react'
import { Menu } from 'antd'
import Authorized from '../../utils/Authorized'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

export const ActionMenuItem = (props: any) => {
  const { code, children, ...otherProps } = props
  if (code && !Authorized.check(code, true, false)) {
    return null
  }
  return <MenuItem {...otherProps}>{children}</MenuItem>
}

export const ActionSubMenu = (props: any) => {
  const { code, children, ...otherProps } = props
  if (code && !Authorized.check(code, true, false)) {
    return null
  }
  return <SubMenu {...otherProps}>{children}</SubMenu>;
}

// 查找权限，返回p标签
export const ActionElement = (props: any) => {
  const { code, children, ...otherProps } = props
  if (code && !Authorized.check(code, true, false)) {
    return null
  }
  return <p {...otherProps}>{children}</p>
}

// 单纯查找权限(导出权限、)
export const actionInspect = (props: any) => {
  const { code } = props
  if (code && !Authorized.check(code, true, false)) {
    return false
  }
  return true
}

export default ActionMenuItem
