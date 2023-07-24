import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login/LoginView.vue';
import File from '../views/file/IndexView.vue';
import Repository from '../views/admin/repository/IndexView.vue';
import RepoCoddingTable from '../views/admin/repository/CoddingTable.vue';
import RepoShellTable from '../views/admin/repository/CoddingTable.vue';
import RepoDocTable from '../views/admin/repository/CoddingTable.vue';
import RepoNoteTable from '../views/admin/repository/CoddingTable.vue';
import AdminUser from '../views/admin/users/UserView.vue';
import Layout from '../components/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/file',
      component: Layout,
      children: [
        {
          path: '/file',
          name: 'file',
          component: File
        },
        {
          path: '/repo',
          name: 'repo',
          component: Repository
        },
        {
          path: '/repo/shell',
          name: 'shell',
          component: RepoShellTable
        },
        {
          path: '/repo/codding',
          name: 'codding',
          component: RepoCoddingTable
        },
        {
          path: '/repo/document',
          name: 'document',
          component: RepoDocTable
        },
        {
          path: '/repo/notes',
          name: 'notes',
          component: RepoNoteTable
        },
        
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Layout,
      redirect: '/admin/users',
      children: [
        {
          path: '/admin/users',
          name: 'user',
          component: AdminUser
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
