import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import { ConfigProvider } from 'antd'
import ZH_CN from 'antd/lib/locale-provider/zh_CN'
import routes from './routers/index'
import { Provider } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import history from './utils/history'
import { hot } from 'react-hot-loader/root'
import { setConfig } from 'react-hot-loader'
import createStore from './utils/createStore'

const store = createStore()

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ConfigProvider locale={ZH_CN}>
          <Switch>
            {routes.map((route: any, index: number) => (
              <Route {...route} key={`route-${index}`} />
            ))}
          </Switch>
        </ConfigProvider>
      </Router>
    </Provider>
  )
}

setConfig({
  showReactDomPatchNotification: false
})
const HotApp = hot(App)

ReactDOM.render(<HotApp />, document.getElementById('app'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
