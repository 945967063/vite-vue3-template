import { BaseRoutes, PageNotFound } from '@/router';
import { RouteRecordRaw } from 'vue-router';
interface IState {
  router: RouteRecordRaw[];
  asyncRouter: RouteRecordRaw[];
  setRouters: RouteRecordRaw[];
}

export default defineStore('routers', {
  state: (): IState => {
    return {
      router: [],
      asyncRouter: [],
      /**设置里面的路由 */
      setRouters: [],
    };
  },

  actions: {
    /**获取路由 */
    async getAsyncRouter() {
      this.router = BaseRoutes.concat(PageNotFound);
      return this.router;
    },
  },
});
