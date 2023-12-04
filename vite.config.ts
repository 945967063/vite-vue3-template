import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
const Timestamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_NAME } = env;
  return {
    //自定义主题
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/element-variarbles.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      }),
      Components({ resolvers: [ElementPlusResolver({ importStyle: 'sass' })] }),
    ],
    //配置路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
    },
    build: {
      outDir: VITE_APP_NAME,
      chunkSizeWarningLimit: 1000, // 提高超大静态资源警告大小
      minify: 'terser',
      brotliSize: false, //启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      terserOptions: {
        // 清除console和debugger
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        // input: "index.html",
        output: {
          // 静态资源打包做处理
          chunkFileNames: `static/js/[name]-[hash]-${Timestamp}.js`,
          entryFileNames: `static/js/[name]-[hash]-${Timestamp}.js`,
          assetFileNames: `static/[ext]/[name]-[hash]-${Timestamp}.[ext]`,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    server: {
      port: 9528,
      open: true,
    },
  };
});
