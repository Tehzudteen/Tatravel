import './style.css';
 // Default weight is 400


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)



app.use(createPinia())
app.use(router)

app.mount('#app')
