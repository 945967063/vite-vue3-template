<template>
  <el-pagination
    v-model:current-page="pageParams.currentPage"
    v-model:page-size="pageParams.pageSize"
    :layout="layoutDetails"
    :total="props.totalCount"
    :pager-count="5"
    background
    @current-change="getProjectList"
  />
</template>
<script setup lang="ts">
  const props = defineProps({
    totalCount: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  });
  const emits = defineEmits(['pageChange']);
  watch(
    () => props.pageSize,
    (newData) => {
      if (newData) {
        nextTick(() => {
          pageParams.pageSize = newData;
        });
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  const pageParams = reactive({
    currentPage: 1,
    pageSize: 10,
  });
  const getProjectList = async () => {
    emits('pageChange', pageParams);
  };

  const layoutDetails = computed(() => {
    return 'total, prev, pager, next, jumper';
  });
</script>
