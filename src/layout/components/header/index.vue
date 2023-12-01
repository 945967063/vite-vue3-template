<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          class="w-[33px] h-[33px] rounded-[33px]"
          alt="logo"
          src="https://avatars.githubusercontent.com/u/89059293?v=4"
        />
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5">
          酌饮慢思倾楼
        </a-typography-title>
      </a-space>
    </div>
    <div class="right-side">
      <div>
        <a-button class="nav-btn" type="outline" :shape="'circle'" @click="setDropDownVisible">
          <template #icon>
            <icon-language />
          </template>
        </a-button>

        <a-dropdown trigger="click" @select="changeLocale as any">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption v-for="item in locales" :key="item.value" :value="item.value">
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </div>
      <div>
        <a-button class="nav-btn" type="outline" :shape="'circle'" @click="handleToggleTheme">
          <template #icon>
            <icon-moon-fill v-if="theme === 'dark'" />
            <icon-sun-fill v-else />
          </template>
        </a-button>
      </div>
      <div>
        <a-button class="nav-btn" type="outline" :shape="'circle'" @click="toggleFullScreen">
          <template #icon>
            <icon-fullscreen-exit v-if="isFullscreen" />
            <icon-fullscreen v-else />
          </template>
        </a-button>
      </div>

      <div>
        <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
          <img alt="avatar" src="https://avatars.githubusercontent.com/u/89059293?v=4" />
        </a-avatar>
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
  const triggerBtn = ref();
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
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
</script>

<style scoped lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: var(--color-bg-2);
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
