import RequestHelper from '@/utils/BaseRequest';

/**用户列表 */
export function getUserList(params: { params: any }) {
  return RequestHelper.request({
    url: 'user/list',
    method: 'get',
    params: params,
  });
}

/**冻结账号 */
export function freezeUser(params: any) {
  return RequestHelper.request({
    url: 'user/freeze',
    method: 'get',
    params: params,
  });
}

/**删除账号 */
export function deleteUser(params: any) {
  return RequestHelper.request({
    url: 'user/delete',
    method: 'get',
    params: params,
  });
}
