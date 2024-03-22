import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/login/index.vue';
import Admin from '../views/admin/index.vue';
import Map from '../components/Map.vue';
import Select from '../views/select/index.vue';
import Edit from '../views/edit/index.vue';
const routes = [
  { path: '/', name: 'login', component: Login },
  { 
    path: '/Admin/:id', 
    name: 'admin', 
    component: Admin,
    children: [
      {
        path: 'select',
        component: Select,
        name: 'select',
      },
      {
        path: 'edit',
        component: Edit,
        name: 'edit',
      }
    ] 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

export default router;
