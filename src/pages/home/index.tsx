import React, { useState, useEffect } from 'react'
// import { Redirect } from 'react-router-dom'

import CompanyAccount from './account/companyAccount'
import Info from './company/info'
import DriverSpread from './driver/driverSpread'

import './index.less'

import Header from '../../components/Header'
import HomeMenu from './HomeMenu'
import MainFrame from '../../components/MainFrame'
import TabPage from '../../components/TabPage'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

export enum MenuStatus {
  EXPAND = 'EXPAND', // 展开
  COLLAPSE = 'COLLAPSE', // 收起
}

export const MenuContext = React.createContext({
  menuStatus: MenuStatus.EXPAND,
  toggleStatus: () => {},
})

function Home({ history }: any) {
  const { username } = useSelector((s: any) => s.user)
  // if (!username) {
  //   return <Redirect to="/" /> 会报钩子错误
  // }
  useEffect(() => {
    if (!username) {
      history.push('/')
    }
  }, [username])
  const [menuStatus, setMenuStatus] = useState(MenuStatus.EXPAND)
  const toggleStatus = () => {
    let status = menuStatus === MenuStatus.EXPAND ? MenuStatus.COLLAPSE : MenuStatus.EXPAND
    setMenuStatus(status)
  }
  // 子路由
  const routes = [
    {
      title: '公司账户管理',
      path: '/home/account/company',
      component: CompanyAccount,
    },
    {
      title: '公司信息',
      path: '/home/company/info',
      component: Info,
    },
    {
      title: '司机分布',
      path: '/home/driver/driverSpread',
      component: DriverSpread,
    },
  ]
  const HomeIndex = () => {
    return (<div>welcome 林剑河</div>)
  } 
  const fixedPanes = {
    title: '首页',
    component: HomeIndex,
    key: 'tab-home-page',
    closable: false,
  }
  return (
    <div className="home-wrapper">
      <Header></Header>
      <MenuContext.Provider value={{menuStatus, toggleStatus}}>
        <HomeMenu routes={routes} />
        <MainFrame>
          {
            <TabPage routes={routes} fixedPanes={fixedPanes} />
          }
        </MainFrame>
      </MenuContext.Provider>
    </div>
  );
}

export default withRouter(Home)
