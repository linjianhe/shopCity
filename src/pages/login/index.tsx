import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../actions/user'
import WrappedNormalLoginForm from './Form'
import './index.less'

export interface IloginValues {
  userName: string,
  password: string,
  vcode: string
}

function Login({history}: any) {
  const dispatch = useDispatch()
  const { loading, loginStatus } = useSelector((s: any) => s.user)
  useEffect(() => {
    if (`${loginStatus}` === '1') {
      history.push('/home')
    }
  },[loginStatus])
  const userLogin = (values: IloginValues) => {
    dispatch(login(values.userName, values.password, values.vcode))
  }
  
  return (
    <div className="login-wrapper">
      <WrappedNormalLoginForm onLogin={userLogin} loading={loading}/>
    </div>
  );
}

export default withRouter(Login)
