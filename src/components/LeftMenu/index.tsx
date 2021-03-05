import React from 'react'
import { MenuContext, MenuStatus } from '../../pages/home/index'
import './index.less'

function LeftMenu(props: any) {
  // const [initData, setInitData] = useState('logo')

  return (
    <MenuContext.Consumer>
      {({ menuStatus, toggleStatus }) => (
        <div
          className={
            MenuStatus.COLLAPSE === menuStatus
              ? 'left-menu collapse'
              : 'left-menu'
          }
        >
          <div className="left-menu-content">{props.children}</div>
          <button type="button" onClick={toggleStatus} className="opt-btn" />
        </div>
      )}
    </MenuContext.Consumer>
  )
}

export default LeftMenu
