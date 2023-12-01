import { RouteRecordRaw } from 'vue-router';
const HomeRoutes: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/layout/index.vue'),
  redirect: '/welcome',
  meta: {
    icon: 'homeFilled',
    title: '首页',
  },
  children: [
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('@/views/home/index.vue'),
    },
  ],
};
export default HomeRoutes;
