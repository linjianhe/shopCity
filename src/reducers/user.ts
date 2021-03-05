export enum UserActionType {
  SAVE_USER_DATA = 'SAVE_USER_DATA', // 获取服务状态
  USER_LOGOUT = 'USER_LOGOUT', // 获取服务状态
}
import { getStorage } from '../utils/storage';
// import { KEYS } from '../utils/authority';

const uinfo = getStorage('u-info') || {}
const { username = '' } = uinfo;

const initState = {
  username,
  loginStatus: false,
  loginStatusDesc: false,
  loading: false,
};

export default function (state: any = initState, action: any) {
  switch (action.type) {
    case UserActionType.SAVE_USER_DATA:
      return Object.assign({}, state, action.payload)
    case UserActionType.USER_LOGOUT:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}
