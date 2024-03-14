import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/login/index.vue';
import Admin from '../views/admin/index.vue';
import Map from '../components/Map.vue';
const routes = [
  { path: '/', name: 'login', component: Login },
  { 
    path: '/Admin/:id', 
    name: 'admin', 
    component: Admin,
    children: [
      {
        path: 'map',
        component: Map,
        name: 'map',
      }
    ] 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router;
