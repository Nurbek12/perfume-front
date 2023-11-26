import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './language'
import VueSplide from '@splidejs/vue-splide'

import '@splidejs/vue-splide/css'
import './assets/styles.css'

createApp(App)
    .use(i18n)
    .use(VueSplide)
    .use(vuetify)
    .use(store)
    .use(router)
    .mount('#app')