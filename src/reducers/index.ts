import { combineReducers } from 'redux'
import user from './user'
import home from './home'
import driverSpread from './driverSpread'
import {UserActionType} from './user'

const appReducer = (history?: any) =>
  combineReducers({
    /* your app’s top-level reducers */
    user,
    home,
    driverSpread,
    // router: connectRouter(history),
  });

const rootReducer = (history?: any) => {
  return (state: any | undefined, action: any) => {
    if (action.type === UserActionType.USER_LOGOUT) {
      state = undefined
    }

    return appReducer(history)(state, action)
  };
};

export default rootReducer
