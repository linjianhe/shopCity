import { HomeActionType } from '../reducers/home'

// import {
//   loadEnumRequest,
//   loadCarGroupListRequest,
//   loadCityListRequest,
//   loadVehicleModelListRequest,
//   fetchHomePageData,
// } from '../api';
// import HttpUtil from '../utils/http';

// export const loadEnum = () => {
//   return async (dispath: any) => {
//     const res: any = await loadEnumRequest();
//     if (res && res.re) {
//       const enumsResult = res.re;
//       if (enumsResult.orderstateenumv2) {
//         enumsResult.orderstateenumv2.map((list: any, key: any) => {
//           if (list.value === -1 || list.value === 2) {
//             delete enumsResult.orderstateenumv2[key];
//           } else if (list.value === 4) {
//             list.text = '待服务';
//           }
//         });
//       }
//       dispath({
//         type: ActionTypes.SAVE_HOME_DATA,
//         payload: {
//           enums: enumsResult,
//         },
//       });
//     }
//   };
// };

// // 首页数据
// export const fetchHomeData = () => {
//   return async (dispath: any) => {
//     dispath({
//       type: ActionTypes.SAVE_HOME_DATA,
//       payload: {
//         loading: true,
//       },
//     });
//     const res: any = await fetchHomePageData();
//     const notifyCountRes: any = await companyNoticeNoRead();
//     if (res && res.re) {
//       dispath({
//         type: ActionTypes.SAVE_HOME_DATA,
//         payload: {
//           ...res.re,
//           notifyCount:
//             (HttpUtil.isSuccess(notifyCountRes, true) &&
//               notifyCountRes.re.count) ||
//             0,
//         },
//       });
//     }
//     dispath({
//       type: ActionTypes.SAVE_HOME_DATA,
//       payload: {
//         loading: false,
//       },
//     });
//   };
// };

export const removeTabPage = (key: string) => ({
  key,
  type: HomeActionType.REMOVE_TAB_PAGE,
})
export const addTabPage = (page: object) => ({
  page,
  type: HomeActionType.ADD_TAB_PAGE,
})

export const changeCurrentTabPage = (key: string) => ({
  key,
  type: HomeActionType.CHANGE_CURRENT_TAB_PAGE,
})

export const removeAllTabPage = () => ({
  type: HomeActionType.REMOVE_ALL_TAB_PAGE,
})

// 显示修改密码弹出框
export const showModifyPwdModal = () => ({
  type: HomeActionType.SAVE_HOME_DATA,
  payload: { showModifyPwModal: true },
})

// 隐藏修改密码弹出框
export const hideModifyPwdModal = () => ({
  type: HomeActionType.SAVE_HOME_DATA,
  payload: { showModifyPwModal: false },
})

// // 获取所有有效车组
// export const loadCarGroupList = () => {
//   return async (dispath: any) => {
//     const res: any = await loadCarGroupListRequest();
//     if (res && res.re) {
//       dispath({
//         type: ActionTypes.GET_CARGROUP_LIST_DATA,
//         payload: {
//           carGroupList: res.re,
//         },
//       });
//     }
//   };
// };

// // 获取城市列表
// export const loadCityList = () => {
//   return async (dispath: any) => {
//     const res: any = await loadCityListRequest();
//     if (res && res.re) {
//       dispath({
//         type: ActionTypes.GET_CITY_LIST_DATA,
//         payload: {
//           cityList: res.re.c2CCorpServiceCityList,
//         },
//       });
//     }
//   };
// };

// // 车型列表
// export const loadVehicleModelList = () => {
//   return async (dispath: any) => {
//     const res: any = await loadVehicleModelListRequest();
//     if (res && res.re) {
//       dispath({
//         type: ActionTypes.GET_VEHICLEMODE_LIST_DATA,
//         payload: {
//           modelList: res.re.modelList,
//         },
//       });
//     }
//   };
// };

// // 司机招募二维码
// export const loadDriverQrCodeParams = () => {
//   return async (dispath: any) => {
//     const res: any = await driverRecruitmentEncryption();
//     if (res && res.re) {
//       dispath({
//         type: ActionTypes.SAVE_HOME_DATA,
//         payload: {
//           companyId: res.re.companyId,
//         },
//       });
//     }
//   };
// };
