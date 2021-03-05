import React from 'react'

import { Redirect } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'

// 顶级路由配置
const routes = [
  {
    exact: true, // 是否是默认
    path: '/',
    component: () => <Redirect to="/login" />,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: Login,
  },

  {
    path: '/*',
    component: () => <Redirect to="/404" />,
  },
];

export default routes
