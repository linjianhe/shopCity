import React, { useState } from 'react'
import { Menu, message } from 'antd'
import { useDispatch } from 'react-redux'
import { addTabPage } from '../../../actions/home'
import LeftMenu from '../../../components/LeftMenu'
import ActionMenuItem, { ActionSubMenu } from '../../../components/ActionMenuItem'
import { buttonAuthCode, menuAuthCode } from '../../../utils/Authorized'
import { KEYS } from '../../../utils/authority'
import './index.less'

const SubMenu = ActionSubMenu;
const MenuItem = ActionMenuItem;

function HomeList(props: any) {
  const dispatch = useDispatch()
  const { routes = [] } = props
  const [routeMap, setRouteMap] = useState(()=> {
    let routeMap = {}
    routes.forEach((item: any, index: number) => {
      routeMap[item.path] = { ...item, key: `menu-item-${index}` }
    })
    return routeMap
  })

  const handleClick = (e: any) => {
    const route = routes.find((item: any) => `menu-item-${item.path}` === e.key)
    if (route) {
      dispatch(addTabPage({
        title: e.item.props.children,
        // content: `New Tab Pane ${e.key}`,
        key: route.path,
      }))
    } else {
      message.info('未找到对应的路由')
    }
  };

  const getMenuItemKey = (path: any) => {
    const route = routeMap[path]
    if (route) {
      return `menu-item-${path}`
      // return route.key;
    }
    return ''
  }

  return (
    <div>
      <LeftMenu>
        <div className="home-left">
          <div className="workbench">
            <h4 className="title-info">
              我的工作台
            </h4>
            <Menu
              onClick={handleClick}
              style={{ width: 238, marginLeft: -24, borderRight: 0 }}
              defaultSelectedKeys={['1']}
              /*  defaultOpenKeys={['sub1']} */
              mode="inline"
            >
              <SubMenu
                code={menuAuthCode.company}
                key="menu-item-company"
                title={
                  <span>
                    <span>公司管理</span>
                  </span>
                }
              >
                <MenuItem
                  code={KEYS.adminAuthCode}
                  key={getMenuItemKey('/home/company/info')}
                >
                  公司信息
                </MenuItem>
                <MenuItem
                  code={KEYS.adminAuthCode}
                  key={getMenuItemKey('/home/company/employee')}
                >
                  员工账号
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.company.code}
                  key={getMenuItemKey('/home/company/about')}
                >
                  公司介绍
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.suggestion.code}
                  key={getMenuItemKey('/home/company/suggestion')}
                >
                  意见反馈
                </MenuItem>
              </SubMenu>
              <SubMenu
                code={menuAuthCode.account}
                key="menu-item-account"
                title="账户管理"
              >
                <MenuItem
                  code={buttonAuthCode.companyAccount.code}
                  key={getMenuItemKey('/home/account/company')}
                >
                  公司账户管理
                </MenuItem>
              </SubMenu>
              <SubMenu
                code={menuAuthCode.driver}
                key="menu-item-driver"
                title="司机管理"
              >
                <MenuItem
                  key={getMenuItemKey('/home/driver/signUpInfoList')}
                >
                  报名信息管理
                </MenuItem>
                <MenuItem
                  key={getMenuItemKey('/home/driver/signUpOnlineList')}
                >
                  线上招募查询
                </MenuItem>
                <MenuItem key={getMenuItemKey('/home/driver/list')}>
                  司机信息
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.driverSpread.code}
                  key={getMenuItemKey('/home/driver/driverSpread')}
                >
                  司机分布
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.driverTransfer.code}
                  key={getMenuItemKey(
                    '/home/driver/driverTransferCheck'
                  )}
                >
                  司机转移审核
                </MenuItem>
              </SubMenu>
              <SubMenu
                code={menuAuthCode.car}
                key="menu-item-car"
                title="车辆管理"
              >
                <MenuItem
                  code={buttonAuthCode.carReocrd.code}
                  key={getMenuItemKey('/home/car/report')}
                >
                  车辆提报
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.carInfo.code}
                  key={getMenuItemKey('/home/car/list')}
                >
                  车辆信息
                </MenuItem>
              </SubMenu>
              <SubMenu
                code={menuAuthCode.job}
                key="menu-item-order"
                title="工作表现"
              >
                <MenuItem
                  code={buttonAuthCode.orderInfo.code}
                  key={getMenuItemKey('/home/order/list')}
                >
                  订单信息
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.orderEarning.code}
                  key={getMenuItemKey('/home/order/income')}
                >
                  订单收入
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.dispachEdit.code}
                  key={getMenuItemKey('/home/order/reassign')}
                >
                  改派记录
                </MenuItem>
              </SubMenu>
              <SubMenu
                code={menuAuthCode.service}
                key="menu-item-service"
                title="服务表现"
              >
                <MenuItem
                  code={buttonAuthCode.comment.code}
                  key={getMenuItemKey('/home/service/comment')}
                >
                  评价信息
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.complaint.code}
                  key={getMenuItemKey('/home/service/complaint')}
                >
                  投诉信息
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.feedback.code}
                  key={getMenuItemKey('/home/service/feedback')}
                >
                  问券反馈信息
                </MenuItem>
                <MenuItem
                  code={buttonAuthCode.warningSign.code}
                  key={getMenuItemKey('/home/service/warningsign')}
                >
                  警示牌
                </MenuItem>
              </SubMenu>
              <MenuItem
                code={menuAuthCode.statistics}
                key={getMenuItemKey('/home/chart/statistics')}
              >
                数据统计
              </MenuItem>
              <MenuItem
                code={menuAuthCode.report}
                key={getMenuItemKey('/home/report/download')}
              >
                报表下载
              </MenuItem>
            </Menu>
          </div>
        </div>
      </LeftMenu>
    </div>
  )
}

export default (HomeList)
