import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import { createApp } from 'vue';
import 'toastr/build/toastr.min.css';
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

import App from './Layout/App.vue';
let app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

app.use(router)
app.mount('#app')
