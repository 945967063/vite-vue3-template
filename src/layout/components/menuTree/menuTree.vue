<template>
  <el-menu :default-active="defaultActive" router>
    <template v-for="item in menu" :key="item.path">
      <el-menu-item v-if="!item.meta?.rank" :index="item.path">
        <el-icon><icon-menu /></el-icon>
        <template #title>{{ item.meta?.title + '' }}</template>
      </el-menu-item>
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.meta?.title + '' }}</span>
        </template>
        <MenuTree
          :menu="item.children"
          :defaultActive="defaultActive"
          @clickItem="clickItemHandle"
        />
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
  import { Menu as IconMenu, Location } from '@element-plus/icons-vue';
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

  const emit = defineEmits(['clickItem']);

  // 点击当前菜单项
  const clickItemHandle = (item: any) => {
    emit('clickItem', item);
  };
</script>
<style lang="scss" scoped></style>
