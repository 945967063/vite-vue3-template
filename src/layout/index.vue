<template>
  <a-config-provider :locale="zhCN">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider hide-trigger collapsible :collapsed="login.isCollapse">
          <Sider />
        </a-layout-sider>
        <a-layout-content>
          <Content />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
<script setup lang="ts">
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import Header from './components/header/index.vue';
  import Sider from './components/sider/index.vue';
  import Content from './components/content/index.vue';
  import useStore from '@/store';
  const { login } = useStore();
</script>
<style lang="scss" scoped></style>
