import { RouteRecordRaw } from 'vue-router';
const AbleRouter: RouteRecordRaw = {
  path: '/able',
  component: () => import('@/layout/index.vue'),
  redirect: '/able/excel',
  meta: {
    title: 'menu.features',
    icon: 'avatar',
    rank: 'able',
  },
  children: [
    {
      path: '/able/excel',
      name: 'Excel',
      component: () => import('@/views/able/excel/excel.vue'),
      meta: {
        title: 'menu.exportExcel',
      },
    },
  ],
};
export default AbleRouter;
