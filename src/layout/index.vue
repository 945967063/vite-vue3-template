<template>
  <div class="common-layout">
    <el-config-provider :locale="locale">
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-container>
          <div :class="[login.isCollapse ? 'collapse-ln' : 'expand-ln']">
            <Sider />
          </div>
          <div>
            <Content />
          </div>
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs';
  import enUS from 'element-plus/es/locale/lang/en.mjs';
  import Header from './components/header/index.vue';
  import Sider from './components/sider/index.vue';
  import Content from './components/content/index.vue';
  import useStore from '@/store';
  import useLocale from '@/hooks/locale';
  const { login } = useStore();
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
<style lang="scss" scoped>
  :deep(.el-header) {
    padding: 0;
  }
  //菜单折叠动画
  .collapse-ln {
    width: 64px;
    animation: collapse 0.5s;
  }
  .expand-ln {
    width: 200px;
    animation: expand 0.5s;
  }

  @keyframes collapse {
    0% {
      width: 200px;
    }
    100% {
      width: 64px;
    }
  }
  @keyframes expand {
    0% {
      width: 64px;
    }
    100% {
      width: 200px;
    }
  }
</style>
