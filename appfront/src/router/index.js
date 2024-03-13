import { createRouter, createWebHashHistory } from 'vue-router';
import Map from '../components/Map.vue';
import Login from '../views/login/index.vue';
const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/select/map', name: 'map', component: Map },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;
