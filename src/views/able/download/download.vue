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
    <el-card class="mt-2">
      <div class="flex w-full">
        <div id="seadragon-viewer"></div>

        <div class="colorClass">
          <div class="slider-demo-block">
            <span class="demonstration">对比度</span>
            <el-slider v-model="contrast" :min="0" :max="800" @change="changeContrast" />
          </div>
          <div class="slider-demo-block">
            <span class="demonstration">亮度</span>
            <el-slider v-model="brightness" :min="0" :max="1500" @change="changeBrightness" />
          </div>
          <div class="slider-demo-block">
            <span class="demonstration">深褐色</span>
            <el-slider v-model="sepia" :min="0" :max="100" @change="changeSepia" />
          </div>
          <div class="slider-demo-block">
            <span class="demonstration">旋转</span>
            <el-slider v-model="rotate" :min="0" :max="360" @change="changeRotate" />
          </div>

          <div class="slider-demo-block">
            <el-button type="primary" @click="resetClick">重置</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </el-card>
</template>
<script setup lang="ts">
  import OpenSeadragon from 'openseadragon';
  import axios from 'axios';
  export interface TileOption {
    /**
     * 缩放比
     */
    scale?: number;
    /**
     * 瓦片：宽
     */
    sliceWidth?: number;
    /**
     * 瓦片：宽
     */
    sliceHeight?: number;
    /**
     * 切片：宽
     */
    srcWidth?: number;
    /**
     * 切片：高
     */
    srcHeight?: number;
    /**
     * 层数
     */
    hierarchy?: number;

    gama?: number;
    darkValue?: number;

    fileSize?: number;
    rate?: number;
    sliceFmt?: number;
    quality?: number;
    timeConsuming?: string;
    fusionLayer?: number;
    step?: number;
    serial?: string;
    scanTime?: number;
  }

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
  const contrast = ref(100);
  const changeContrast = (val: any) => {
    document.documentElement.style.setProperty('--image-contrast', val + '%');
  };
  const brightness = ref(100);
  const changeBrightness = (val: any) => {
    document.documentElement.style.setProperty('--image-brightness', val + '%');
  };
  const sepia = ref(0);
  const changeSepia = (val: any) => {
    document.documentElement.style.setProperty('--image-sepia', val + '%');
  };

  const rotate = ref(0);
  const changeRotate = (val: any) => {
    document.documentElement.style.setProperty('--image-hue-rotate', val + 'deg');
  };

  const resetClick = () => {
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    rotate.value = 0;
    document.documentElement.style.setProperty('--image-contrast', '100%');
    document.documentElement.style.setProperty('--image-brightness', '100%');
    document.documentElement.style.setProperty('--image-sepia', '0%');
    document.documentElement.style.setProperty('--image-hue-rotate', '0deg');
  };
  // //默认设置
  // let defaultOptions: OpenSeadragon.Options = {
  //   id: 'seadragon-viewer',
  //   prefixUrl: '/openseadragon/',
  //   navigatorAutoResize: true, // 导航器大小自动调整
  //   showNavigator: true, // 显示导航图
  //   placeholderFillStyle: '#f3f3f3', // 初始化时，图片未载入现实的样式，默认是白色
  //   debugGridColor: ['#000000'],
  //   minZoomImageRatio: 1,
  //   zoomPerScroll: 2, // 滚轮放大倍率
  //   navigatorOpacity: 1, // 导航图透明度
  //   showZoomControl: false, // 不显示放大按钮
  //   showHomeControl: false, // 显示主页按钮
  //   showFullPageControl: false, // 显示全屏按钮
  //   navigatorBackground: '#fff', // 导航背景颜色
  //   navigatorBorderColor: '#fff', // 导航边框颜色
  //   navigatorPosition: 'BOTTOM_LEFT',
  //   gestureSettingsMouse: {
  //     clickToZoom: false,
  //   },
  // };
  // const viewer = ref(); //openSeadragon查看器类

  // const createViewer = async (urlPath: string) => {
  //   const extraInfo = await getExtraInfo(urlPath);
  //   const openSeadragonOptions = await intOption(urlPath, extraInfo);
  //   let view = OpenSeadragon(openSeadragonOptions);
  //   viewer.value(view);
  // };

  // //初始化设置
  // const intOption = async (urlPath: string, extraInfo: TileOption) => {
  //   const openSeadragonOptions = { ...defaultOptions };

  //   openSeadragonOptions.minPixelRatio = extraInfo.scale; // 默认为0.5 需根据切片倍率设置 最小像素比.值越小，清晰度越高，体积越大
  //   const maxLevel = (extraInfo.hierarchy as any) - 1;
  //   (openSeadragonOptions.tileSources as any) = {
  //     tileWidth: extraInfo.sliceWidth,
  //     tileHeight: extraInfo.sliceHeight,
  //     height: extraInfo.srcHeight,
  //     width: extraInfo.srcWidth,
  //     maxLevel: maxLevel,
  //     minLevel: 0,
  //     getTileUrl: function (level: number, x: number, y: number) {
  //       return `http://120.79.57.164:7013/api/SliceService/image-slices/${urlPath}/tile?Level=${
  //         maxLevel - level
  //       }&X=${x}&Y=${y}`;
  //     },
  //   };
  //   setLevelScale(openSeadragonOptions, openSeadragonOptions.minPixelRatio);
  //   return openSeadragonOptions;
  // };
  // const getExtraInfo = async (urlPath: string): Promise<TileOption> => {
  //   return axios.get(`http://120.79.57.164:7013/api/SliceService/image-slices/${urlPath}/info`, {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'X-Requested-With',
  //     },
  //   });
  // };

  // const setLevelScale = (openSeadragonOptions: OpenSeadragon.Options, ratio: number = 0.5) => {
  //   (openSeadragonOptions.tileSources as any).getLevelScale = function (level: number): any {
  //     const levelScaleCache: { [key: number]: number } = {};
  //     let i;
  //     for (i = 0; i <= this.maxLevel; i++) {
  //       levelScaleCache[i] = 1 / Math.pow(1 / ratio, this.maxLevel - i);
  //     }
  //     this.getLevelScale = function (_level: number) {
  //       return levelScaleCache[_level];
  //     };
  //     return this.getLevelScale(level);
  //   };
  // };

  onMounted(() => {
    let duomo = {
      Image: {
        xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
        Url: '//openseadragon.github.io/example-images/duomo/duomo_files/',
        Format: 'jpg',
        Overlap: '2',
        TileSize: '256',
        Size: {
          Width: '13920',
          Height: '10200',
        },
      },
    };

    OpenSeadragon({
      id: 'seadragon-viewer',
      prefixUrl: '//openseadragon.github.io/openseadragon/images/',
      tileSources: duomo,
    });
  });
  // const urlPath = ref('18416799b3b501858030ce8e92b898f5');
  // onMounted(async () => {
  //   createViewer(urlPath.value);
  // });
</script>
<style lang="scss" scoped>
  #seadragon-viewer {
    width: 1300px;
    height: 900px;
    filter: contrast(var(--image-contrast)) brightness(var(--image-brightness))
      sepia(var(--image-sepia)) hue-rotate(var(--image-hue-rotate));
  }
  .colorClass {
    margin-left: 20px;
    width: 400px;
  }
  .slider-demo-block {
    align-items: center;
    & > span {
      width: 100px;
    }
  }
  .slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
  }
</style>
