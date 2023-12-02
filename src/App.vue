<script setup lang="ts">
  // import { computed } from 'vue';
  // import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  // import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  // import useLocale from '@/hooks/locale';
  // const { currentLocale } = useLocale();
  // const locale = computed(() => {
  //   switch (currentLocale.value) {
  //     case 'cn':
  //       return zhCN;
  //     case 'en':
  //       return enUS;
  //     default:
  //       return enUS;
  //   }
  // });
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
  #nprogress .bar {
    /* 自定义进度条颜色 */
    background: var(--el-color-primary) !important;
  }
</style>
