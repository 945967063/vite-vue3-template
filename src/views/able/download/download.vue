<template>
  <el-card shadow="never">
    <template #header>
      <span class="font-medium">文件下载功能</span>
    </template>
    <div class="flex flex-wrap">
      <el-button
        @click="downloadByOnlineUrl('https://avatars.githubusercontent.com/u/89059293?v=4')"
      >
        下载在线图片
      </el-button>

      <el-button @click="down">根据后台接口文件流下载</el-button>
    </div>
  </el-card>
</template>
<script setup lang="ts">
  import axios from 'axios';

  const downloadByOnlineUrl = (url: string) => {
    urlToBlobAndDownload(url);
  };

  const down = () => {
    downloadByAxios(
      'https://ts1.cn.mm.bing.net/th?id=OIP-C.7KW5GT7NQ8yUGlBbCHEm0gHaNK&w=187&h=333&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      '1'
    );
  };
  //将图片转化为blob对象再进行下载
  function urlToBlobAndDownload(url: string) {
    //实例化一个img对象
    const img = new Image();
    //设置img的图片路径
    img.src = url;
    //设置跨域解决
    img.setAttribute('crossOrigin', 'Anonymous');
    //img加载完后处理
    img.onload = function () {
      //创建一个canvas对象
      const canvas = document.createElement('canvas');
      //把图片的宽度设为canves的宽度
      canvas.width = img.width;
      //把图片的高度设为canves的高度
      canvas.height = img.height;
      //创建一个2d画布
      const ctx = canvas.getContext('2d');
      // 将img中的内容画到画布上
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      // 将画布内容转换为Blob
      canvas.toBlob((blob) => {
        // blob转为同源url
        let blobUrl = window.URL.createObjectURL(blob as Blob);
        // 创建a链接
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = '1';
        // 触发a链接点击事件，浏览器开始下载文件
        a.click();
      });
    };
  }

  function downloadByAxios(url: string, name: string) {
    axios({
      //设置图片路径
      url: url,
      //设置请求方法为get请求
      method: 'get',
      //设置相应类型为blob
      responseType: 'blob',
    }).then(
      //得到的是一个blob对象
      (res) => {
        let url = window.URL.createObjectURL(new Blob([res as any], { type: (res as any).type }));
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
      }
    );
  }
</script>
<style lang="scss" scoped></style>
