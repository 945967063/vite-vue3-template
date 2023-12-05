<template>
  <div class="navbar">
    <div class="left-side">
      <el-space>
        <img
          class="w-[33px] h-[33px] rounded-[33px]"
          alt="logo"
          src="https://avatars.githubusercontent.com/u/89059293?v=4"
        />

        酌饮慢思倾楼
      </el-space>
    </div>
    <div class="right-side">
      <div>
        <el-button
          type="primary"
          :icon="isFullscreen ? 'FullScreen' : 'FullScreen'"
          circle
          @click="toggleFullScreen"
        />
      </div>
      <LanguageAndDark />
      <div>
        <el-dropdown @command="handleCommand">
          <el-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/89059293?v=4" />
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import useStore from '@/store';
  const { login } = useStore();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

  const handleCommand = (command: string | number | object) => {
    if (command === 'logout') {
      login.logout();
    }
  };
</script>

<style scoped lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    align-items: center;
    list-style: none;
    & > div {
      margin-left: 20px;
    }
  }
</style>
@/i18n
