<template>
  <div class="menu-demo">
    <el-menu
      :default-active="active"
      :collapse="login.isCollapse"
      :collapse-transition="false"
      router
    >
      <MenuTree :menu="routers.asyncRouter" :defaultActive="active" @clickItem="handleMenuClick" />
    </el-menu>
  </div>
  <div class="h-[60px] w-full bg-white flex items-center pl-[20px]">
    <div @click="login.isCollapse = !login.isCollapse">
      <el-icon v-if="login.isCollapse" size="20"><Expand /></el-icon>
      <el-icon v-else size="20"><Fold /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
  import MenuTree from '../menuTree/menuTree.vue';
  import useStore from '@/store';
  const route = useRoute();
  const { routers, login } = useStore();
  console.log(route.path);

  const active = computed(() => {
    const str = route.fullPath;

    return str;
  });

  const handleMenuClick = (item: any) => {
    console.log('父组件', item);
  };
</script>
<style lang="scss" scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 120px);
  }
  :deep(.el-menu.el-menu--vertical.el-menu-demo) {
    background: #35373d;
    height: 100%;
  }
  :deep(li.el-menu-item.is-active) {
    background-color: var(--el-color-primary);
    color: #ffffff;
  }

  :deep(li.el-menu-item):hover {
    background-color: var(--el-color-primary);
    color: #ffffff;
  }
  :deep(.el-menu) {
    height: 100%;
    border-right: none;
  }
</style>
