import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
// import funcPlugins from './plugins/func';
// import objPlugins from './plugins/obj';
// import person from './plugins/person';
import globalComponents from './plugins/global-components';

const app = createApp(App);
// app.use(funcPlugins);
// app.use(objPlugins, { name: 'myName' });
// app.use(person);
app.use(globalComponents);
app.use(router);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

// console.log(import.meta.env.MODE); // development
// console.log(import.meta.env.BASE_URL); // /
// console.log(import.meta.env.PROD); // false
// console.log(import.meta.env.DEV); // true
