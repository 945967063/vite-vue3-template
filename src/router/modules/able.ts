import { RouteRecordRaw } from 'vue-router';
// import i18n from '@/i18n/index';
// const t = i18n.global.t;
const AbleRouter: RouteRecordRaw = {
  path: '/able',
  component: () => import('@/layout/index.vue'),
  redirect: '/able/excel',
  meta: {
    title: '功能',
    icon: 'avatar',
    rank: 'able',
  },
  children: [
    {
      path: '/able/excel',
      name: 'Excel',
      component: () => import('@/views/able/excel/excel.vue'),
      meta: {
        title: '导出Excel',
      },
    },
  ],
};
export default AbleRouter;
