<template>
  <div class="ml-5">
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
  <div class="ml-5">
    <el-button type="primary" @click="handleToggleTheme" circle>
      <template #icon>
        <span v-if="theme === 'dark'" class="iconfont icon-dark-full"></span>
        <span v-else class="iconfont icon-light-full"></span>
      </template>
    </el-button>
  </div>
</template>
<script setup lang="ts">
  import { LOCALE_OPTIONS } from '@/i18n';
  import useLocale from '@/hooks/locale';
  import { useDark, useToggle } from '@vueuse/core';
  import useStore from '@/store';
  const { login } = useStore();
  const { changeLocale, currentLocale } = useLocale();
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
  const changeLocaleCommand = (command: string | number | object) => {
    login.isCollapse = true;
    changeLocale(command as string);
    setTimeout(() => {
      login.isCollapse = false;
    }, 200);
  };
</script>
<style lang="scss" scoped></style>
