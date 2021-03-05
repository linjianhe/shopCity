// 手机号
export const checkMobile = (val: string) => /^(1(([3478][0-9]{1})|(5[^4,\D]{1})|(66)|(9[89]{1}))\d{8})$/.test(val)

//判断身份证号码格式函数
//公民身份号码是特征组合码，
//排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码
export const checkIdcard = (idcard: string) => {
  if (typeof idcard != 'string') {
    return false
  }
  idcard = idcard.toUpperCase()
  const area = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
  }
  let Y, JYM
  let S, M
  let ereg
  let idcard_array = []
  idcard_array = idcard.split('')
  if (!area[parseInt(idcard.substr(0, 2))]) {
    return false
  }
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 ||
        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 &&
          (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)
      ) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ //测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ //测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        return true
      } else {
        return false
      }
      break;
    case 18:
      if (
        parseInt(idcard.substr(6, 4)) % 4 === 0 ||
        (parseInt(idcard.substr(6, 4)) % 100 === 0 &&
          parseInt(idcard.substr(6, 4)) % 4 === 0)
      ) {
        ereg = /^[1-9][0-9]{5}19|20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ //闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}19|20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ //平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S =
          (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
          (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
          (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
          (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
          (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
          (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
          (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
          parseInt(idcard_array[7]) * 1 +
          parseInt(idcard_array[8]) * 6 +
          parseInt(idcard_array[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1)
        if (M == idcard_array[17]) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
      break;
    default:
      return false
  }
}