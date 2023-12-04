import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { CreateRouterGuards } from './guards';
import AbleRouter from './modules/able';
import HomeRoutes from './modules/home';
import NestedRouter from './modules/nested';
export const BaseRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
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
