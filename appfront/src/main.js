import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'leaflet/dist/leaflet.css'; // 导入 Leaflet 的 CSS
import 'leaflet-draw/dist/leaflet.draw.css'; // 导入 Leaflet Draw 的 CSS
import './style.css'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)
app.use(ElementPlus)
app.use(router);
app.mount('#app')
