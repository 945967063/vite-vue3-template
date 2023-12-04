<script setup lang="ts">
  import { computed } from 'vue';
  import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs';
  import enUS from 'element-plus/es/locale/lang/en.mjs';
  import useLocale from '@/hooks/locale';
  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'cn':
        return zhCn;
      case 'en':
        return enUS;
      default:
        return enUS;
    }
  });
</script>

<template>
  <el-config-provider :locale="locale" size="large"><RouterView></RouterView></el-config-provider>
</template>

<style>
  #nprogress .bar {
    /* 自定义进度条颜色 */
    background: var(--el-color-primary) !important;
  }
</style>
