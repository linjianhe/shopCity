import RenderAuthorized from '../components/Authorized'
import { getAuthority } from './authority'

let Authorized = RenderAuthorized(getAuthority())

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority())
};

export { reloadAuthorized }

export const menuAuthCode = {
  company: '1000000',
  account: '2000000',
  driver: '3000000',
  car: '4000000',
  job: '5000000',
  service: '6000000',
  report: '8010001',
  statistics: '9000000',
}

// 约定 code是上一级的code
// 约定 add: 新建, export: 导出
export const buttonAuthCode = {
  company: {
    // 公司介绍
    add: '1010001', // 添加
    edit: '1010002', // 修改
    delete: '1010003', // 删除
    activeInfo: '1010004', // 生效中内容查看
    code: '1010000',
  },
  suggestion: {
    // 意见反馈
    submit: '1020001', // 提交
    code: '1020000',
  },
  companyAccount: {
    // 公司账户管理
    submit: '2010001', // 提现
    code: '2010000',
  },
  driverApply: {
    // 报名司机信息
    approve: '3030009', // 审核
    export: '3030010', // 导出
    notifyInterview: '3030001', // 通知面试
    batchNotifyInterview: '3030002', // 批量通知面试
    recordInterview: '3030003', // 录入面试
    notifySign: '3030004', // 通知签约
    batchNotifySign: '3030005', // 批量通知签约
    recordSign: '3030008', // 录入签约
    bgAuthCheck: '3030006', // 背景调查
    uploadBgAuthCheck: '3030007', // 上传背景调查授权书
    code: '3030000',
  },
  driverInfo: {
    // 司机信息
    modify: '3020001', // 修改
    stopOperating: '3020002', // 停运
    stopCCooperation: '3020003', // 终止合作
    forceOrder: '3020004', // 强制接单设置
    splitCar: '3020005', // 分配车辆
    export: '3020006', // 导出
    attachManage: '3020007', // 附件维护
    untyingVehicle: '3020008', // 解绑车辆
    changeOutingDriverTab: '3020009', // 转出中司机tab
    changeOutDriver: '3020010', // 转出司机
    changeOutCancel: '3020011', // 取消转出
    changeOutingDriverExport: '3020012', // 转出中司机导出
    code: '3020000',
  },
  driverTransfer: {
    // 司机转移
    agree: '3050001', // 审核同意
    refuse: '3050002', // 审核拒绝
    export: '3050003', // 导出
    code: '3050000',
  },
  driverSpread: {
    // 司机分布
    code: '3040000',
  },
  carReocrd: {
    // 车辆提报
    add: '4010001', // 新建
    edit: '4010002', // 修改
    delete: '4010003', // 删除
    submit: '4010004', // 提报
    export: '4010005', // 导出
    code: '4010000',
  },
  carInfo: {
    // 车辆信息
    edit: '4020001', // 修改
    exit: '4020002', // 退出运营
    revert: '4020003', // 回复运营
    export: '4020004', // 导出
    attachManage: '4020005', // 附件维护
    code: '4020000',
  },

  orderInfo: {
    // 订单信息
    locus: '5010001', // 司机轨迹
    history: '5010002', // 历史记录
    export: '5010003', // 导出
    code: '5010000',
  },

  orderEarning: {
    // 订单收入
    export: '5020001', // 导出
    code: '5020000',
  },
  dispachEdit: {
    // 改派记录
    export: '5030001', // 导出
    code: '5030000',
  },
  comment: {
    // 评价
    export: '6010001', // 导出
    code: '6010000',
  },
  complaint: {
    // 投诉信息
    export: '6020001', // 导出
    code: '6020000',
  },
  feedback: {
    // 问券反馈信息
    export: '6030001', // 导出
    code: '6030000',
  },
  warningSign: {
    // 警示牌
    export: '6040001', // 导出
    code: '6040000',
  },

  statisticsOnline: {
    // 司机在线统计
    export: '9010001', // 查询
    code: '9010000',
  },
  statisticsEfficiency: {
    // 司机绩效统计
    export: '9020001',
    code: '9020000',
  },

  statisticsService: {
    // 司机服务统计
    export: '9030001',
    code: '9030000',
  },

  statisticsOrder: {
    // 订单数据统计
    export: '9040001',
    code: '9040000',
  },
};

export function actionColumns(
  columns: any,
  auth: any,
  exclude = ['add', 'export', 'code']
) {
  let auths = auth;
  if ('object' === typeof auth) {
    // 排除 code ,新建, 导出
    const authsObject = { ...auth };
    exclude.forEach(k => {
      delete authsObject[k];
    });
    auths = Object.keys(authsObject).map(k => authsObject[k]);
  }
  if (Authorized.check(auths, true, false)) {
    return columns;
  }
  if (columns) {
    columns.splice(columns.length - 1, 1);
  }
  return columns;
}

export default Authorized;
