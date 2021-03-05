import React from 'react'
import { MenuContext, MenuStatus } from '../../pages/home/index'
import './index.less'

function MainFram(props: any) {
  return (
    <MenuContext.Consumer>
      {({ menuStatus }) => (
        <div className={MenuStatus.COLLAPSE === menuStatus ? 'main-frame collapse' : 'main-frame'}>
          {props.children}
        </div>
      )}
    </MenuContext.Consumer>
  )
}

export default MainFram
