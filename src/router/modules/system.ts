import { RouteRecordRaw } from 'vue-router';
const SystemRouter: RouteRecordRaw = {
  path: '/system',
  component: () => import('@/layout/index.vue'),
  redirect: '/system/user',
  meta: {
    title: 'menu.system',
    icon: 'icon-gongneng',
    rank: 'system',
    class: 'system',
  },
  children: [
    {
      path: '/system/user',
      name: 'User',
      component: () => import('@/views/system/user/user.vue'),
      meta: {
        title: 'menu.hsUser',
        class: 'user',
      },
    },
  ],
};
export default SystemRouter;
