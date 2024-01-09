<script setup lang="ts">
  const ds = ref();

  onMounted(() => {
    nextTick(() => {
      const DragSelect = window.DragSelect;
      ds.value = new DragSelect({
        selectables: document.getElementsByClassName('selectable-nodes'),
        area: document.getElementById('area'),
        multiSelectMode: true,
        //选中
        onElementSelect: function (element: HTMLElement) {
          //设置颜色
          element.style.background = '#134973';
        },
        //取消选中
        onElementUnselect: function (element: HTMLElement) {
          //设置颜色
          element.style.background = '';
        },
        //鼠标抬起后返回所有选中的元素
        callback: function (element: HTMLElement) {
          console.log(element);
        },
      });
    });
  });

  onUnmounted(() => {
    ds.value.stop();
  });
</script>

<template>
  <div id="area" class="w-[500px] h-[500px] border-[1px] border-[#134973] flex flex-wrap">
    <div
      class="selectable-nodes w-[50px] h-[50px] border-[1px] m-6 border-[#134973]"
      v-for="item in 25"
      :key="item"
    ></div>
  </div>
</template>
