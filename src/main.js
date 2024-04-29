import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Parse from 'parse/dist/parse.min.js';

Parse.initialize(
  `${import.meta.env.VITE_BACK4APP_APPLICATION_ID}`,
  `${import.meta.env.VITE_BACK4APP_JAVASCRIPT_KEY}`
);

Parse.serverURL = 'https://parseapi.back4app.com/';

const app = createApp(App);

app.use(router);

app.mount('#app');
