/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /**主题背景色 */
        primary: 'var(--el-bg-color-page)',
        white: 'var(--el-fill-color-blank)',
      },
      boxShadow: {
        boxTop: '0 0 6px -2px var(--el-color-primary)',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.el-button': {
          'background-color': 'var(--el-button-bg-color,val(--el-color-white))',
        },
      });
    },
  ],
};
