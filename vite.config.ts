import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
      }),
      Components(),
    ],
    //配置路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    server: {
      port: 9528,
      open: true,
    },
  };
});
