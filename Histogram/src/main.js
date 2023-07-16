import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import './assets/main.css'
import './scss/global.scss';

import request from "./plugins/request.js";

app.use(createPinia())
app.use(router)
app.use(request);

app.mount('#app')
