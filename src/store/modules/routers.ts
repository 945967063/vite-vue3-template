import { BaseRoutes, PageNotFound, AsyncRoutes } from '@/router';
import { RouteRecordRaw } from 'vue-router';
export interface IState {
  router: RouteRecordRaw[];
  asyncRouter: RouteRecordRaw[];
}

export default defineStore('routers', {
  state: (): IState => {
    return {
      router: [],
      asyncRouter: [],
    };
  },

  actions: {
    /**
     * Filter asynchronous routing tables by recursion 通过递归过滤异步路由表
     * @param routes asyncRoutes
     * @param roles
     */
    filterAsyncRoutes(routes: any[], roles: any) {
      console.log('roles', roles);

      const res: any[] = [];
      routes.forEach((route) => {
        const tmp = { ...route };
        if (this.hasPermission(roles, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterAsyncRoutes(tmp.children, roles);
          }
          res.push(tmp);
        }
      });

      return res;
    },
    /**判断是否有btnPermission */
    hasPermission(roles: any[], route: { meta: { btnPermission: string | any[] } }) {
      if (route.meta && route.meta.btnPermission) {
        return roles.some((role) => route.meta.btnPermission.includes(role.code));
      }

      return true;
    },
    /**获取路由 */
    async getAsyncRouter() {
      const userInfo = JSON.parse(localStorage.getItem('vue3-admin-userInfo') || '{}');
      if (userInfo.permissions) {
        const permissions = userInfo.permissions || [];
        const asyncRouter = this.filterAsyncRoutes(AsyncRoutes, permissions);
        this.router = BaseRoutes.concat(asyncRouter).concat(PageNotFound);
        this.asyncRouter = asyncRouter;
        return this.router;
      } else {
        this.router = BaseRoutes.concat(AsyncRoutes).concat(PageNotFound);
      }
      return this.router;
    },
  },
});
