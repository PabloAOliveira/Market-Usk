// Plugins
import { registerPlugins } from '@/plugins'

import './firebase'

// Components
import App from './App.vue'
import router from './router'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.mount('#app')
