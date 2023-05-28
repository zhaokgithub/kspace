import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginView.vue';
import File from '../views/file/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      redirect:'/file'
    },
    {
      path:'/file',
      name:'file',
      component: File
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
