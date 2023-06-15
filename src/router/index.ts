import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginView.vue';
import File from '../views/file/IndexView.vue';
import Repository from '../views/repository/IndexView.vue';
import Layout from '../components/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      redirect:'/file',
      component: Layout,
      children:[
        {
          path:'/file',
          name:'file',
          component: File
        },
        {
          path:'/repo',
          name:'repo',
          component: Repository
        },
      ]
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
