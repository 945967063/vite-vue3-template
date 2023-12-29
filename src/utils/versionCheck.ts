import axios from 'axios';

// 版本检查
export const versionCheck = async () => {
  const response = await axios.get(`${window.location.origin}/version.json?${Date.now()}`);
  console.log(process.env.VITE__APP_VERSION__, (response as any).version);

  // process.env.VITE__APP_VERSION__  获取环境变量设置的值，判断是否与生成的版本信息一致
  if (process.env.VITE__APP_VERSION__ !== (response as any).version) {
    ElMessageBox.confirm(
      `检测到新版本，更新之后将能体验到更多好用的功能，是否现在更新？`,
      '版本更新提示',
      {
        confirmButtonText: '更新',
        type: 'warning',
        showCancelButton: false,
        draggable: true,
      }
    ).then(async () => {
      window.location.reload();
    });
  }
};
