import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/login/index.vue';
import Admin from '../views/admin/index.vue';
import Select from '../views/select/index.vue';
import Edit from '../views/edit/index.vue';
import { useMenuStore } from '@/stores/menu';
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
        name: 'Select',
      },
      {
        path: 'edit',
        component: Edit,
        name: 'Edit',
      }
    ] 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    localStorage.removeItem('token');
    next();
  } else {
    const token = localStorage.getItem('token');
    if (!token) {
      next({
        path: '/',
      })
    } else {
      const menuStore = useMenuStore();
      menuStore.setActiveItem(to.name);
      next();
    }
  }
})
export default router;
