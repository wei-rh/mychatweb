// import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import RetrievePassword from '../views/RetrievePassword.vue'
import Test from "../views/TestView.vue"
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: "/index",
    meta: { requiresAuth: true }
  },
  {
    path: '/index',
    name: 'Index',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: IndexView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/newpass',
    name: 'newpass',
    component: RetrievePassword
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: { requiresAuth: true }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
