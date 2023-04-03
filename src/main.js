import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

require('@/store/subscriber')

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

store.dispatch('auth/attempt', {a:localStorage.getItem('accessToken')}).then(() =>
createApp(App).use(router).use(store).mount('#app')
)

