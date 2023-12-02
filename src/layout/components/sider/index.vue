<template>
  <div class="menu-demo">
    <MenuTree :menu="routers.asyncRouter" :defaultActive="active" @clickItem="handleMenuClick" />
  </div>
</template>
<script setup lang="ts">
  import MenuTree from '../menuTree/menuTree.vue';
  import useStore from '@/store';
  const route = useRoute();
  const { routers } = useStore();
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
    height: calc(100vh - 60px);
  }
  :deep(.el-menu.el-menu--vertical.el-menu-demo) {
    background: #35373d;
    height: 100%;
  }

  :deep(li.el-menu-item.is-active) {
    background-color: var(--el-color-primary);
    font-size: 16px;
    font-family:
      Microsoft YaHei UI-Bold,
      Microsoft YaHei UI;
    font-weight: bold;
    color: #ffffff;
  }

  :deep(li.el-menu-item):hover {
    background-color: var(--el-color-primary);
    font-size: 16px;
    font-family:
      Microsoft YaHei UI-Bold,
      Microsoft YaHei UI;
    font-weight: bold;
    color: #ffffff;
  }
  :deep(.el-menu) {
    height: 100%;
  }
</style>
