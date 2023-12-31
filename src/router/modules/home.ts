import { RouteRecordRaw } from 'vue-router';
const HomeRoutes: RouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/layout/index.vue'),
  redirect: '/home',
  meta: {
    icon: 'icon-shouye',
    title: 'menu.home',
    class: 'home',
  },
  children: [
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: 'menu.home',
        class: 'home',
      },
      component: () => import('@/views/home/index.vue'),
    },
  ],
};
export default HomeRoutes;
