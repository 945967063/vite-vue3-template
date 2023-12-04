import { RouteRecordRaw } from 'vue-router';
const nestedRouter: RouteRecordRaw = {
  path: '/nested',
  redirect: '/nested/menu1/menu1-1',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: 'menu.hsmenus',
    icon: 'icon-xiazai',
    rank: 'nested',
    class: 'nested',
  },
  children: [
    {
      path: '/nested/menu1',
      meta: {
        title: 'menu.hsmenu1',
        keepAlive: true,
        rank: 'nested',
        class: 'menu1',
      },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: '/nested/menu1/menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: {
            title: 'menu.hsmenu1_1',
            keepAlive: true,
            class: 'menu1-1',
          },
        },
        {
          path: '/nested/menu1/menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: {
            title: 'menu.hsmenu1_2',
            keepAlive: true,
            rank: 'nested',
            class: 'menu1-2',
          },
          children: [
            {
              path: '/nested/menu1/menu1-2/menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: {
                title: 'menu.hsmenu1_2_1',
                keepAlive: true,
                class: 'menu1-2-1',
              },
            },
            {
              path: '/nested/menu1/menu1-2/menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: {
                title: 'menu.hsmenu1_2_2',
                keepAlive: true,
                extraIcon: 'IF-pure-iconfont-new svg',
                class: 'menu1-2-2',
              },
            },
          ],
        },
        {
          path: '/nested/menu1/menu1-3',
          component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: {
            title: 'menu.hsmenu1_3',
            keepAlive: true,
            class: 'menu1-3',
          },
        },
      ],
    },
    {
      path: '/nested/menu2',
      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index.vue'),
      meta: {
        title: 'menu.hsmenu2',
        keepAlive: true,
        class: 'menu2',
      },
    },
  ],
};
export default nestedRouter;
