<template>
  <a-config-provider :locale="locale">
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
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import Header from './components/header/index.vue';
  import Sider from './components/sider/index.vue';
  import Content from './components/content/index.vue';
  import useLocale from '@/hooks/locale';
  import useStore from '@/store';
  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'cn':
        return zhCN;
      case 'en':
        return enUS;
      default:
        return enUS;
    }
  });

  const { login } = useStore();
</script>
<style lang="scss" scoped></style>
