import http from '../utils/http'

export async function login(params: object) {
  return http.post('/api/doLogin', params, undefined, true)
}

export async function logout() {
  return http.post('/api/logout', {}, undefined, true)
}

export async function modifyPwd(params: object) {
  return http.post('/api/changePassword', params, undefined, false)
}

export async function refreshPicUrl(params: object) {
  return http.api('/api/refreshPicUrl', params)
}

// 司机分布
export async function distributeMaps() {
  return http.post('/api/distributeMaps', {}, undefined, true)
}