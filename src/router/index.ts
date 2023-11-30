import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { CreateRouterGuards } from './guards';
export const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
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
  },
];
export const PageNotFound: RouteRecordRaw = {
  path: '/:path(.*)',
  name: '404',
  component: () => import('@/views/errer/index.vue'),
};
const router = createRouter({
  history: createWebHistory(),
  routes: BaseRoutes,
});
export function mountRouter(app: App) {
  app.use(router);
  CreateRouterGuards(router);
}
