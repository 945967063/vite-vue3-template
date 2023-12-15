import RequestHelper from '@/utils/BaseRequest';

/**登录 */
export function login(params: { bodyParams: any }) {
  return RequestHelper.request({
    url: 'user/login',
    method: 'post',
    params: params,
  });
}

/**注册 */
export function register(params: { bodyParams: any }) {
  return RequestHelper.request({
    url: 'user/register',
    method: 'post',
    params: params,
  });
}

/**获取验证码 */
export function getCodeApi(params: { params: any }) {
  return RequestHelper.request({
    url: 'user/register-captcha',
    method: 'get',
    params: params,
  });
}
