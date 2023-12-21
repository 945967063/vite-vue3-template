import RequestHelper from '@/utils/BaseRequest';

/**登录 */
export function loginApi(params: { bodyParams: any }) {
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

/**更新密码获取验证码 */
export function updatePasswordCodeApi(params: { params: any }) {
  return RequestHelper.request({
    url: 'user/update_password/captcha',
    method: 'get',
    params: params,
  });
}

/**修改密码 */
export function updatePassword(params: { bodyParams: any }) {
  return RequestHelper.request({
    url: 'user/update_password',
    method: 'post',
    params: params,
  });
}

/**刷新token */
export function refreshTokenApi(params: { params: any }) {
  return RequestHelper.request({
    url: 'user/refresh',
    method: 'get',
    params: params,
  });
}
