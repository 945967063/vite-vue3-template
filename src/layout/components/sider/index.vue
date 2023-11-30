<template>
  <div class="menu-demo">
    <a-menu
      :style="{ width: '100%', height: '100%' }"
      :default-open-keys="['0']"
      :default-selected-keys="['0_2']"
      show-collapse-button
      breakpoint="xl"
      @collapse="onCollapse"
    >
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-menu-item key="0_1">Menu 2</a-menu-item>
        <a-menu-item key="0_2">Menu 3</a-menu-item>
        <a-menu-item key="0_3">Menu 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>Navigation 2</template>
        <a-menu-item key="1_0">Menu 1</a-menu-item>
        <a-menu-item key="1_1">Menu 2</a-menu-item>
        <a-menu-item key="1_2">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>Navigation 3</template>
        <a-menu-item key="2_0">Menu 1</a-menu-item>
        <a-menu-item key="2_1">Menu 2</a-menu-item>
        <a-sub-menu key="2_2" title="Navigation 4">
          <a-menu-item key="2_2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_2_1">Menu 2</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
  import { IconApps, IconBug, IconBulb } from '@arco-design/web-vue/es/icon';
  import useStore from '@/store';
  const { login } = useStore();
  const onCollapse = (val: boolean) => {
    login.isCollapse = val;
  };
</script>
<style lang="scss" scoped>
  .menu-demo {
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: var(--color-neutral-2);
  }
  .collapsed {
    width: 100%;
    height: 100%;
  }
  .collapsed-no {
    width: 200px;
    height: 100%;
  }
</style>
