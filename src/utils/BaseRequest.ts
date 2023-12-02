/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 封装axios请求
 */
import axios, { AxiosRequestConfig, Method } from 'axios';
export default class RequestHelper {
  static source = axios.CancelToken.source();

  // 控制同一错误，回车后反复弹窗
  static errorFlag = true;

  //初始化请求配置
  static async init(): Promise<any> {
    RequestHelper.setBaseUrl();

    RequestHelper.initInterceptors();
  }

  static setBaseUrl() {
    console.log(import.meta.env.VITE_API);

    const remoteUrl: string = import.meta.env.VITE_API as string;
    axios.defaults.baseURL = remoteUrl;
    axios.defaults.timeout = 10000;
  }

  static initInterceptors(): void {
    console.log('initInterceptors');
    // 添加请求拦截器
    axios.interceptors.request.use(
      async function (config) {
        // if (tokens) {
        //   // 将 token 添加到请求报文头中
        //   config.headers!['Authorization'] = `Bearer ${tokens.token}`;

        //   // 判断 accessToken 是否过期
        //   const jwt: any = decryptJWT(tokens.token);

        //   const exp = getJWTDate(jwt.exp as number);

        //   // token 已经过期
        //   if (new Date() >= exp) {
        //     // 携带刷新 token
        //     config.headers!['X-Authorization'] = `Bearer ${tokens.refreshToken}`;
        //   }
        // }
        return config;
      },
      function (error: any) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    axios.interceptors.response.use(
      function (response: any) {
        // 对响应数据做点什么
        console.log('response', response);
        if (response) {
          switch (response.status) {
            case 200:
              const accessToken = response.headers['access-token'];
              const xAccessToken = response.headers['x-access-token'];

              if (accessToken && xAccessToken) {
                // const tokens = {
                //   token: accessToken,
                //   refreshToken: xAccessToken,
                // };
              }

              return response.headers['content-type'] === 'application/octet-stream'
                ? response.data
                : response.data.data;

            default:
              return response;
          }
        }
      },

      function (error: any) {
        console.log('error', error);
        // 对响应错误做点什么
        const response = error && error.response ? error.response : null;
        if (response && response.status && response.status === 401) {
          return Promise.reject(error.response);
        } else {
          if (response && response.data && [403].includes(response.status)) {
            return Promise.reject(error.response.data);
          }
          if (response && response.data && [500, 400].includes(response.status)) {
            return Promise.reject(error.response.data);
          }
        }
        return Promise.reject(error.response);
      }
    );
  }

  //网络请求的处理
  static async request(
    api: {
      url: string;
      method: Method;
      params: { params?: any; bodyParams?: any };
    },
    axiosConfig: AxiosRequestConfig = {
      cancelToken: RequestHelper.source.token,
    }
  ): Promise<any> {
    // console.log("1111");
    const { params, bodyParams } = api.params;
    const config: AxiosRequestConfig = axiosConfig ? axiosConfig : {};

    config.url = api.url;
    config.method = api.method;
    if (params) {
      config.params = params;
    }
    if (bodyParams) {
      config.data = bodyParams;
    }
    try {
      const result = await axios.request(config);

      return result;
    } catch (error) {
      // 这里主要是判断这个错误是取消请求导致的还是其他原因导致的
      if (axios.isCancel(error)) {
      }
      return Promise.reject(error);
    }
  }

  //取消所有请求
  static async cancelAllRequest() {
    RequestHelper.source.cancel();
  }
}

/**
 * 解密 JWT token 的信息
 * @param token jwt token 字符串
 * @returns <any>object
 */
export function decryptJWT(token: string): any {
  token = token.replace(/_/g, '/').replace(/-/g, '+');
  const json = decodeURIComponent(escape(window.atob(token.split('.')[1])));
  return JSON.parse(json);
}

/**
 * 将 JWT 时间戳转换成 Date
 * @description 主要针对 `exp`，`iat`，`nbf`
 * @param timestamp 时间戳
 * @returns Date 对象
 */
export function getJWTDate(timestamp: number): Date {
  return new Date(timestamp * 1000);
}
