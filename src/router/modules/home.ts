import { RouteRecordRaw } from 'vue-router';
const HomeRoutes: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/layout/index.vue'),
  redirect: '/home',
  meta: {
    icon: 'homeFilled',
    title: '首页',
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: '欢迎',
      },
      component: () => import('@/views/home/index.vue'),
    },
  ],
};
export default HomeRoutes;
