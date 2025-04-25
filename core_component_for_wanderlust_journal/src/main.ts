import './assets/main.css'
import 'vuetify/styles'
import 'leaflet/dist/leaflet.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create vuetify instance
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
