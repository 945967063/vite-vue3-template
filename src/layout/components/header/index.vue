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
        <el-dropdown @command="changeLocaleCommand">
          <el-button type="primary" circle>
            <template #icon>
              <span class="iconfont icon-zhongyingwenyingwen"></span>
            </template>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                class="w-[100px]"
                v-for="item in locales"
                :key="item.value"
                :command="item.value"
                :value="item.value"
                :icon="item.value === currentLocale ? 'Check' : ''"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div>
        <el-button type="primary" @click="handleToggleTheme" circle>
          <template #icon>
            <span v-if="theme === 'dark'" class="iconfont icon-dark-full"></span>
            <span v-else class="iconfont icon-light-full"></span>
          </template>
        </el-button>
      </div>
      <div>
        <el-button
          type="primary"
          :icon="isFullscreen ? 'FullScreen' : 'FullScreen'"
          circle
          @click="toggleFullScreen"
        />
      </div>

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
  import { LOCALE_OPTIONS } from '@/i18n';
  import useLocale from '@/hooks/locale';
  import { useDark, useToggle, useFullscreen } from '@vueuse/core';
  import useStore from '@/store';
  const { login } = useStore();
  const { changeLocale, currentLocale } = useLocale();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
  const locales = [...LOCALE_OPTIONS];
  const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
    onChanged(dark: boolean) {
      // overridden default behavior
      login.toggleTheme(dark);
    },
  });
  const theme = computed(() => {
    return login.theme;
  });

  const handleToggleTheme = () => {
    toggleTheme();
  };
  const toggleTheme = useToggle(isDark);

  const handleCommand = (command: string | number | object) => {
    if (command === 'logout') {
      login.logout();
    }
  };
  const changeLocaleCommand = (command: string | number | object) => {
    login.isCollapse = true;
    changeLocale(command as string);
    setTimeout(() => {
      login.isCollapse = false;
    }, 200);
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
