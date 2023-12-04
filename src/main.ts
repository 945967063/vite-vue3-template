import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/index.scss';
import { mountRouter } from '@/router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import RequestHelper from './utils/BaseRequest';
import i18n from './i18n';
RequestHelper.init();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
mountRouter(app);
app.use(pinia);
app.use(i18n);
app.mount('#app');
