import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ArcoResolver()],
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true,
          }),
        ],
      }),
      vitePluginForArco({
        theme: '@arco-themes/vue-sqraycss',
      }),
    ],
    //配置路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    server: {
      port: 9528,
      open: true,
    },
  };
});
