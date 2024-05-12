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
        meta: { alias: '选址规划' },
      },
      {
        path: 'edit',
        component: Edit,
        name: 'Edit',
        meta: { alias: '企业制图' },
      },
      {
        path: 'datamanager',
        component: () => import('../views/DataManager/index.vue'),
        name: 'datamanager',
        meta: { alias: '数据管理' }, 
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
