import React from 'react'
import { Tabs, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import { removeTabPage, changeCurrentTabPage, removeAllTabPage } from '../../actions/home'
const TabPane = Tabs.TabPane
import './index.less'

// const routerPush = (link, pathname) => {
//   if (pathname !== link) histroy.push(link)
// }

function TabPage({ routes, fixedPanes }: any) {
  const dispatch = useDispatch()
  let { panes, activeKey } = useSelector((s: any) => s.home)
  const onChange = (activeKey: any) => {
    dispatch(changeCurrentTabPage(activeKey))
  }

  const onEdit = (targetKey: any, action: any) => {
    // this[action](targetKey)
    remove(targetKey)
  };

  const remove = (targetKey: any) => {
    const keys = pathToKey(targetKey)
    console.log(keys)
    dispatch(removeTabPage(keys.path))
  }

  const pathToKey = (pOrK: any) => {
    const keys = pOrK.split('-');
    const identity = keys[keys.length - 1];
    return {
      key: `tab-content-${identity}`,
      path: identity,
    }
  }

  if (panes.length === 0 && fixedPanes) {
    activeKey = fixedPanes.key
  } else {
    if (activeKey !== fixedPanes.key) {
      activeKey = pathToKey(`${activeKey}`).key
    }
  }

  const panesContents = panes.map((item: any) => {
    const pathAndKey: any = pathToKey(item.key)
    const path = pathAndKey.path
    const route = routes.find((item: any) => item.path === path)
    const key = pathAndKey.key
    return {
      title: route.title,
      ...item,
      key,
      component: route.component,
    }
  })
  return (
    <div className="tab-page">
      <Tabs
        hideAdd
        tabBarExtraContent={
          <Button
            type="dashed"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={() => dispatch(removeAllTabPage())}
          />
        }
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {fixedPanes ? (
          <TabPane
            tab={fixedPanes.title}
            key={fixedPanes.key}
            closable={fixedPanes.closable}
          >
            <fixedPanes.component params={fixedPanes.params}></fixedPanes.component>
          </TabPane>
        ) : null}
        {panesContents.map((pane: any) => (
          // 高阶组件
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            <pane.component params={pane.params}></pane.component>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default TabPage
