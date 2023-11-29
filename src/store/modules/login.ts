import { defineStore } from 'pinia';
export default defineStore('login', {
  state: () => ({
    num: 0,
  }),
  actions: {},
  //数据持久化配置 这里是当前所有变量都持久化
  // persist:true

  //按需配置数据持久化 这里指定变量num保持持久化
  persist: {
    //默认名称为当前store唯一标识 这里即home
    key: 'homeNum',
    //默认localStorage 本地储存
    //这里建议临时储存sessionStorage 也可写成window.sessionStorage
    storage: localStorage,
    //默认当前store里的所有变量都持久化
    paths: ['num'],
  },
});
