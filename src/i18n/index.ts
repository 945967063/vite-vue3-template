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

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'cn',
  legacy: false,
  allowComposition: true,
  messages,
});

export default i18n;
