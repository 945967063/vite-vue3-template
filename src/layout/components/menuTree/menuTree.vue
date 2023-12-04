<template>
  <template v-for="item in menu" :key="item.path">
    <el-sub-menu v-if="item.meta?.rank" :index="item.path">
      <template #title>
        <i :class="['iconfont', item.meta?.icon]"></i>
        <span :class="[login.isCollapse ? '' : 'ml-2']">{{ $t(item.meta?.title + '') }}</span>
      </template>
      <MenuTree :menu="item.children" :defaultActive="defaultActive" @clickItem="clickItemHandle" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <i :class="['iconfont', item.meta?.icon]"></i>
      <template #title>
        <span :class="[login.isCollapse ? '' : 'ml-2']">{{ $t(item.meta?.title + '') }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup name="MenuTree" lang="ts">
  import useStore from '@/store';
  import { PropType } from 'vue';
  defineProps({
    menu: {
      type: Array as unknown as PropType<any[]>,
      required: true,
      default: () => [],
    },
    defaultActive: {
      type: String as unknown as PropType<string>,
      required: true,
      default: '',
    },
  });
  const { login } = useStore();
  const emit = defineEmits(['clickItem']);

  // 点击当前菜单项
  const clickItemHandle = (item: any) => {
    emit('clickItem', item);
  };
</script>
<style lang="scss" scoped></style>
