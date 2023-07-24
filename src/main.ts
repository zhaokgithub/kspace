import './assets/main.css'
import 'ant-design-vue/dist/antd.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import il8n from './language/index';

const app = createApp(App)

app.config.globalProperties.isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? true : false; 
app.use(createPinia());
app.use(router);
app.use(il8n);

app.use(Antd).mount('#app');
