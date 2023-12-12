<template>
  <div class="w-full h-full">
    <span>
      <label for="file">选择要上传的图片</label>
      <input type="file" id="fileInput" accept="image/*" />
    </span>
    <!-- 选择JSON文件 -->
    <span v-show="isUpload">
      <label for="file">选择要上传的JSON文件</label>
      <input type="file" id="fileInputJson" accept="application/json" />
    </span>
    <el-button type="primary" @click="saveCanvas">保存图片</el-button>
    <!-- 用于上传图片 -->
    <div style="position: relative">
      <canvas id="myCanvas" style="position: absolute; top: 0; left: 0"></canvas>
    </div>
  </div>
</template>
<script setup lang="ts">
  const ctx = ref();
  const image = ref();
  const canvas = ref();
  const jsonDetails = ref();
  //是否上传了图片
  const isUpload = ref(false);
  const renderPoints = () => {
    const list = jsonDetails.value.GroupModel.Labels;
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height); // 清空画布
    ctx.value.drawImage(image.value, 0, 0); // 重新绘制图片

    for (let i = 0; i < list.length; i++) {
      ctx.value.strokeStyle = list[i].LineColor; // 设置线的颜色
      // ctx.value.lineWidth = list[i].lineWidth; // 设置线宽度
      ctx.value.lineWidth = 2;
      ctx.value.beginPath();
      ctx.value.moveTo(list[i].Coordinates[0].X, list[i].Coordinates[0].Y); // 将线条起点移动到第一个点

      for (let j = 1; j < list[i].Coordinates.length; j++) {
        ctx.value.lineTo(list[i].Coordinates[j].X, list[i].Coordinates[j].Y); // 连接每个点
      }

      ctx.value.stroke(); // 绘制线条
      ctx.value.closePath();
    }
  };
  // canvas 保存为图片
  const saveCanvas = () => {
    let image = canvas.value.toDataURL('image/png');
    let a = document.createElement('a');
    let event = new MouseEvent('click');
    a.download = '图片';
    a.href = image;
    a.dispatchEvent(event);
  };
  onMounted(() => {
    canvas.value = document.getElementById('myCanvas') as HTMLCanvasElement;
    ctx.value = canvas.value.getContext('2d');
    image.value = new Image();
    // 上传图片并加载到 canvas
    document.getElementById('fileInput')?.addEventListener('change', function (e: any) {
      let file = e.target?.files[0];
      let reader = new FileReader();
      reader.onload = function (event) {
        image.value.onload = function () {
          canvas.value.width = image.value.width;
          canvas.value.height = image.value.height;
          ctx.value?.drawImage(image.value, 0, 0); // 在 canvas 上绘制图片
        };
        image.value.src = event.target?.result as string;
        isUpload.value = true;
      };

      reader.readAsDataURL(file);
    });

    document.getElementById('fileInputJson')?.addEventListener('change', function (e: any) {
      // 读取json文件数据
      let file = e.target?.files[0];
      let reader = new FileReader();

      reader.onload = function (event) {
        jsonDetails.value = JSON.parse(event.target?.result as string);
        renderPoints();
      };

      reader.readAsText(file);
    });
  });
</script>
<style lang="scss" scoped></style>
