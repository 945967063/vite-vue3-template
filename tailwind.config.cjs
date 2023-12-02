/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /**主题背景色 */
        primary: 'var(--el-bg-color-page)',
      },
    },
  },
  plugins: [],
};
