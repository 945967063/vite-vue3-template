import { ElMessage } from 'element-plus';
import { refreshTokenApi } from '@/api/login';
const MAX_ERROR_COUNT = 5; //最大请球次数
let currentCount = 0; //当前请求了多少次
let isRefresh = false;

// const router = useRouter();
export default async function refreshToken(error: { config: any }) {
  const tokens = JSON.parse(localStorage.getItem('vue3-admin-token') || '{}');
  const refresh = tokens.refreshToken ?? null;
  if (!refresh) {
    //如果没找到替换的refreshtoken退出登录
  }
  // 判断当前是否为刷新状态中（防止多个请求导致多次调refresh接口）
  if (!isRefresh) {
    // 设置当前状态为刷新中
    isRefresh = true;
    // 如果重发次数超过，直接退出登录
    if (currentCount > MAX_ERROR_COUNT) {
    }
    // 增加重试次数
    currentCount += 1;
    try {
      const res = await refreshTokenApi({
        params: {
          refresh: refresh,
        },
      }); //用refreshToken刷新token
      localStorage.setItem(
        'vue3-admin-token',
        JSON.stringify({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        })
      );
      // 重置重发次数
      currentCount = 0;
      return window.location.reload();
    } catch {
      // 刷新token失败，直接退出登录
      ElMessage.error('请重新登录');

      return Promise.reject(error);
    } finally {
      // 重置状态
      isRefresh = false;
    }
  } else {
    // 当前正在尝试刷新token，先返回一个promise阻塞请求并推进请求列表中
    return new Promise((resolve) => {
      // 缓存网络请求，等token刷新后直接执行

      resolve(window.location.reload());
    });
  }
}
