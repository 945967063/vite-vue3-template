import { defineStore } from 'pinia';
import router from '@/router';
// import { Message } from '@arco-design/web-vue';
export default defineStore('login', {
  state: () => ({
    num: 0,
    /**菜单是否折叠 */
    isCollapse: false,
    /**暗黑切换 */
    theme: 'light',
    /**当前是登录 1、注册 2、找回密码 3*/
    current: 1,
  }),
  actions: {
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        // html
        document.documentElement.setAttribute('class', 'dark');
      } else {
        this.theme = 'light';
        document.documentElement.setAttribute('class', '');
      }
    },
    /**退出登录 */
    logout() {
      // Message.success('登出成功');
      localStorage.removeItem('vue3-admin-token');
      router.push('/');
    },
  },
  //数据持久化配置 这里是当前所有变量都持久化
  // persist:true

  //按需配置数据持久化 这里指定变量num保持持久化
  persist: {
    //默认名称为当前store唯一标识 这里即home
    key: 'vue-login',
    //默认localStorage 本地储存
    //这里建议临时储存sessionStorage 也可写成window.sessionStorage
    storage: localStorage,
    //默认当前store里的所有变量都持久化
    paths: [],
  },
});
