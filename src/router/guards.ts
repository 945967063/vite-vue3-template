import { Router } from 'vue-router';
import NProgress from '@/utils/progress';

// 白名单(不需要登录检测)
const whiteList = ['/', '/forgetPassword', '/teamInvite', '/privacyPolicy'];

export function CreateRouterGuards(router: Router) {
  router.beforeEach(async (to) => {
    NProgress.start();
    if (!whiteList.includes(to.path)) {
      // 如果没有登录 跳转到登录页页面
    }
    // 如果路由没有初始化 则初始化路由

    return;
  });
  router.onError((error) => {
    console.log(error);
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
