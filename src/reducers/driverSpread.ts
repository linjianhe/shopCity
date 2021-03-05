import produce from 'immer'

export enum DriverSpreadActionType {
  GET_DRIVERSPREAD_LIST_DATA = 'GET_DRIVERSPREAD_LIST_DATA', // 获取司机分布列表
}

export interface IdriverSpreadState {
  driverList: [] // 后台返回的司机分布详情数据
}

const initState: IdriverSpreadState = {
  driverList: []
}

export default function(state: IdriverSpreadState = initState, action: any) {
  return produce(state, (draft: IdriverSpreadState) => {
    switch (action.type) {
      case DriverSpreadActionType.GET_DRIVERSPREAD_LIST_DATA:
        if (action.payload) {
          draft.driverList = action.payload.driverList
        }
        break
      default:
    }
  })
}
