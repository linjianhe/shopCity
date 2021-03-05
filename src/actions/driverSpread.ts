import { Dispatch } from 'redux'
import { DriverSpreadActionType } from '../reducers/driverSpread'

import { distributeMaps } from '../api'

// 获取司机分布数据
export function requestDriverSpreadList() {
  return async (dispath: Dispatch) => {
    const res: any = await distributeMaps()
    if (res && res.re) {
      const { driverList } = res.re
      dispath({
        type: DriverSpreadActionType.GET_DRIVERSPREAD_LIST_DATA,
        payload: {
          driverList,
        },
      })
    }
  }
}
