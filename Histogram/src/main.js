import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.css'
import './scss/global.scss';

import request from "./plugins/request.js";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(request);

app.mount('#app')
