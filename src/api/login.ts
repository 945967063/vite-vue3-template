import RequestHelper from '@/utils/BaseRequest';

/**登录 */
export function login(params: { bodyParams: any }) {
  return RequestHelper.request({
    url: 'api/login',
    method: 'post',
    params: params,
  });
}
