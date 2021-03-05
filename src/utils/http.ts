// / <reference path="ajax.d.ts" />
import axios, { AxiosPromise } from 'axios'
import Evn from './env'
// import { nativeLogin } from './index';
import qs from 'qs'
import { message } from 'antd'
// import { logout } from '../actions/user';
// import store from '../base/createStore';

// const loginUrl = '/#/login';
const API_DOMAIN = 'http://localhost:3000'
const _httpClient = axios.create({
  baseURL: `${API_DOMAIN}`,
  timeout: 5000,
})

// const needLoginHandle = () => {
//   store({}).dispatch(logout(false));
// };

const _makeRequest = <T>(
  method: string,
  url: string,
  queryParams?: object,
  body?: object,
  needError: boolean = false
) => {
  let request: AxiosPromise<T>
  switch (method) {
    case 'GET':
      request = _httpClient.get<T>(url, { params: queryParams })
      break;
    case 'POST':
      request = _httpClient.post<T>(url, body, { params: queryParams })
      break;
    case 'PUT':
      request = _httpClient.put<T>(url, body, { params: queryParams })
      break;
    case 'PATCH':
      request = _httpClient.patch<T>(url, body, { params: queryParams })
      break;
    case 'DELETE':
      request = _httpClient.delete(url, { params: queryParams })
      break;
    default:
      throw new Error('Method not supported')
  }

  return new Promise((resolve, reject) => {
    request
      .then(async response => {
        const result: any = response.data
        if (result.status === 0) {
          // 此处处理不同状态逻辑 例如 ajax 的登录拦截
          resolve(response.data)
        }
        // else if (result.status === 5) {
        //   if (Evn.getAppInfo().isUCar) {
        //     if (window.isCallNativeLogin) return;
        //     window.isCallNativeLogin = true;
        //     try {
        //       await nativeLogin();
        //     } catch (error) {
        //       console.log(error);
        //     } finally {
        //       window.isCallNativeLogin = false;
        //     }
        //   } else {
        //     needLoginHandle();
        //   }
        // }
        else if (result && result.msg) {
          if (needError) {
            resolve(result)
          } else {
            message.error(result.msg ? result.msg : '服务请求失败, 请稍后再试!')
            resolve(result.msg)
          }
        } else {
          reject(result.msg)
        }
      })
      .catch((err: Error) => {
        reject(err)
      })
  })
}
export default class HttpUtil {
  /**
   * get 方式发送请求
   * @param opts ajax 参数
   */
  static getData(config: any) {
    const newConfig = Object.assign(
      {
        method: 'get', // default
        baseURL: `${API_DOMAIN}`,
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000,
      },
      config
    );
    return axios.request(newConfig);
  }

  /**
   * post 方式发送请求
   * @param opts ajax 参数
   */
  static mockData(config: any) {
    const newConfig = Object.assign(
      {
        method: 'get', // default
        baseURL: `${API_DOMAIN}`,
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000,
      },
      config
    );
    const request: AxiosPromise = _httpClient.request(newConfig);

    return new Promise((resolve, reject) => {
      request
        .then(async response => {
          const result: any = response.data;
          if (result.status === 0) {
            // 此处处理不同状态逻辑 例如 ajax 的登录拦截
            resolve(response.data);
          } else if (result.status === 5) {
            if (Evn.getAppInfo().isUCar) {
              if (window.isCallNativeLogin) return;
              window.isCallNativeLogin = true;
              try {
                // 手机端登录，调用桥
                // await nativeLogin();
              } catch (error) {
                console.log(error);
              } finally {
                window.isCallNativeLogin = false;
              }
            } else {
              // needLoginHandle();
            }
          } else {
            reject(response.data);
          }
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }

  /**
   * api 接口调用统一是post data
   * @param opts ajax 调用参数
   */
  static apiDataTransform(config: any) {
    if (
      !config ||
      (typeof config.url !== 'string' && typeof config.api !== 'string')
    )
      return false;
    if (typeof config.api === 'string') {
      const data = config.data || {};
      config.data = qs.stringify({
        data: JSON.stringify(data),
      });
      !NEED_MOCK
        ? (config.url = `/api/gw?uri=${config.api}`)
        : (config.url = config.api);
    }

    return !NEED_MOCK ? HttpUtil.postData(config) : HttpUtil.mockData(config);
  }

  /**
   * post 方式发送请求
   * @param opts ajax 参数
   */
  static postData(config: any, needError: boolean = false) {
    const newConfig = Object.assign(
      {
        method: 'post', // default
        baseURL: `${API_DOMAIN}`,
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000,
      },
      config
    );
    const request: AxiosPromise = _httpClient.request(newConfig);

    // const hideLoading = message.loading('正在加载..', 0);
    return new Promise((resolve, reject) => {
      request
        .then(async response => {
          // hideLoading();
          const result: any = response.data;
          if (result.status === 0) {
            // 此处处理不同状态逻辑 例如 ajax 的登录拦截
            resolve(response.data);
          } else if (result.status === 5) {
            if (Evn.getAppInfo().isUCar) {
              if (window.isCallNativeLogin) return;
              window.isCallNativeLogin = true;
              try {
                // await nativeLogin();
              } catch (error) {
                console.log(error);
              } finally {
                window.isCallNativeLogin = false;
              }
            } else {
              // needLoginHandle();
            }
          } else if (response.data && response.data.msg) {
            if (needError) {
              resolve(response.data);
            } else {
              message.error(
                response.data.msg
                  ? response.data.msg
                  : '服务请求失败, 请稍后再试!'
              );
              resolve(response.data.msg);
            }
          } else {
            reject(response.data);
          }
        })
        .catch((err: Error) => {
          reject(err);
          // hideLoading();
        });
    });

    // return axios.request(newConfig);
  }

  static transformApi(url: string, params: object) {
    return HttpUtil.apiDataTransform({
      api: url,
      data: params,
    });
  }

  /**
   * api 接口调用统一是post data
   * @param opts ajax 调用参数
   */
  static apiData(config: any) {
    if (
      !config ||
      (typeof config.url !== 'string' && typeof config.api !== 'string')
    )
      return false;
    if (typeof config.api === 'string') {
      const data = config.data || {};
      config.data = qs.stringify({
        data: JSON.stringify(data),
      });
      config.url = `/api/gw?uri=${config.api}`;
    }
    const needError = config.needError;
    return HttpUtil.postData(config, needError);
  }

  static api(url: string, params?: object, needError?: boolean) {
    return HttpUtil.apiData({
      needError: !!needError,
      api: url,
      data: params,
    });
  }

  static get<T>(url: string, queryParams?: object) {
    return _makeRequest<T>('GET', url, queryParams)
  }

  static post<T>( url: string, body: object, queryParams?: object, needError?: boolean ) {
    const data: any = qs.stringify(body)
    return _makeRequest<T>('POST', url, queryParams, data, needError)
  }

  static put<T>(url: string, body: object, queryParams?: object) {
    return _makeRequest<T>('PUT', url, queryParams, body)
  }

  static patch<T>(url: string, body: object, queryParams?: object) {
    return _makeRequest<T>('PATCH', url, queryParams, body)
  }

  static delete(url: string, queryParams?: object) {
    return _makeRequest('DELETE', url, queryParams)
  }

  /**
   * axios 不支持jsonp 后期换掉 axios
   * @param opts
   */
  static zeptoGetData(opts: any) {
    const newOpts = Object.assign(
      {
        type: 'GET',
        cache: false,
        dataType: 'json',
        timeout: 20000,
      },
      opts
    );
    return $.ajax(newOpts);
  }

  static fetch(opts: { success: (data: any) => void; error: (data: any) => void }) {
    return new Promise((resolve, reject) => {
      opts.success = (data: any) => {
        resolve(data); // 把需要数据返回
      };
      opts.error = (data: any) => {
        reject(data); // 把整个对象返回，status data 自己在逻辑处理
      };
      return HttpUtil.zeptoGetData(opts);
    });
  }
  // 502460

  static isSuccess(res: any, needContent?: boolean) {
    if (res && res.code === 1) {
      if (needContent) {
        return !!res.re;
      }
      return true;
    }
    return false;
  }
}
