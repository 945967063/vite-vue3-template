<template>
  <div class="menu-demo">
    <a-menu
      :style="{ width: '100%', height: '100%' }"
      show-collapse-button
      :default-selected-keys="active"
      breakpoint="xl"
      @collapse="onCollapse"
      :selected-keys="selectedKeys"
      @menu-item-click="menuCLick"
    >
      <template v-for="item in routers.asyncRouter" :key="item.path">
        <a-menu-item v-if="!item.meta?.rank" :key="item.path">
          <template #icon><icon-apps></icon-apps></template>
          {{ $t(item.meta?.title + '') }}
        </a-menu-item>
        <a-sub-menu v-else>
          <template #icon><icon-apps></icon-apps></template>
          <template #title>{{ $t(item.meta?.title + '') }}</template>
          <a-menu-item v-for="item1 in item.children" :key="item1.path">
            {{ $t(item1.meta?.title + '') }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
  import { IconApps } from '@arco-design/web-vue/es/icon';
  import useStore from '@/store';
  const router = useRouter();
  const route = useRoute();
  const { login, routers } = useStore();
  const onCollapse = (val: boolean) => {
    login.isCollapse = val;
  };
  const selectedKeys = ref<string[]>([]);
  const menuCLick = (e: string) => {
    selectedKeys.value = [e];
    router.push(e);
  };
  const active = computed(() => {
    const str = route.fullPath;
    selectedKeys.value = [str];
    return [str];
  });
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
