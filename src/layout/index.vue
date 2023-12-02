<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Sider />
        </el-aside>
        <el-main>
          <Content />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
  // import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  // import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import Header from './components/header/index.vue';
  import Sider from './components/sider/index.vue';
  import Content from './components/content/index.vue';
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
<style lang="scss" scoped></style>
