import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

const app = createApp(App);
app.use(router);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

// console.log(import.meta.env.MODE); // development
// console.log(import.meta.env.BASE_URL); // /
// console.log(import.meta.env.PROD); // false
// console.log(import.meta.env.DEV); // true
