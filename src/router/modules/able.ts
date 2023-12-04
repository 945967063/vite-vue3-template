import { RouteRecordRaw } from 'vue-router';
const AbleRouter: RouteRecordRaw = {
  path: '/able',
  component: () => import('@/layout/index.vue'),
  redirect: '/able/excel',
  meta: {
    title: 'menu.features',
    icon: 'icon-gongneng',
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
    {
      path: '/able/download',
      name: 'Download',
      component: () => import('@/views/able/download/download.vue'),
      meta: {
        title: 'menu.download',
      },
    },
  ],
};
export default AbleRouter;
