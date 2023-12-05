import { createI18n } from 'vue-i18n';
import en from './en';
import cn from './cn';
console.log('en', en);
const messages = {
  en,
  cn,
};
export const LOCALE_OPTIONS = [
  { label: '中文', value: 'cn' },
  { label: 'English', value: 'en' },
];
const defaultLocale = localStorage.getItem('arco-locale') || 'cn';
/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key;

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'cn',
  legacy: false,
  allowComposition: true,
  messages,
});

export default i18n;
