import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { CreateRouterGuards } from './guards';
import AbleRouter from './modules/able';
import HomeRoutes from './modules/home';
import NestedRouter from './modules/nested';
import SystemRouter from './modules/system';
export const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register.vue'),
  },
];
export const PageNotFound: RouteRecordRaw = {
  path: '/:path(.*)',
  name: '404',
  component: () => import('@/views/errer/index.vue'),
};
export const AsyncRoutes: RouteRecordRaw[] = [
  /**首页 */
  HomeRoutes,
  /**功能 */
  AbleRouter,
  /**多级菜单 */
  NestedRouter,
  /**系统管理 */
  SystemRouter,
];
const router = createRouter({
  history: createWebHistory(),
  routes: BaseRoutes,
});
export function mountRouter(app: App) {
  app.use(router);
  CreateRouterGuards(router);
}
export default router;
