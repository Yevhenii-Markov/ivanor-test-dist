import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { ru } from 'vuetify/locale';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
  locale: {
    locale: 'ru',
    messages: { ru },
  },
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
