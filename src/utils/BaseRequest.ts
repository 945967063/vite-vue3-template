/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 封装axios请求
 */
import axios, { AxiosRequestConfig, Method } from 'axios';
import refreshToken from './refreshToken';
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
    axios.defaults.timeout = 50000;
  }

  static initInterceptors(): void {
    console.log('initInterceptors');
    // 添加请求拦截器
    axios.interceptors.request.use(
      async function (config) {
        const tokens = JSON.parse(localStorage.getItem('vue3-admin-token') || '{}');
        if (tokens) {
          config.headers!['Authorization'] = `Bearer ${tokens.accessToken}`;
        }

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

        return response.data;
      },

      function (error: any) {
        console.log('error', error);
        // 对响应错误做点什么
        const response = error && error.response ? error.response : null;
        if (response && response.status && response.status === 401) {
          refreshToken(response);
        } else {
          if (response && response.data && [403].includes(response.status)) {
            return Promise.reject(error.response.data);
          }
          if (response && response.data && [500, 400].includes(response.status)) {
            return ElMessage.error(response.data.data);
            // return Promise.reject(error.response.data);
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
