import { BaseRoutes, PageNotFound, AsyncRoutes } from '@/router';
import { RouteRecordRaw } from 'vue-router';
interface IState {
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
    /**获取路由 */
    async getAsyncRouter() {
      this.router = BaseRoutes.concat(AsyncRoutes).concat(PageNotFound);
      this.asyncRouter = AsyncRoutes;
      return this.router;
    },
  },
});
