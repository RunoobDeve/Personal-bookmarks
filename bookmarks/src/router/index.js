import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Mark from '../views/mark/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/mark',
    name: 'Mark',
    component: Mark
  },
  {
    path: '/inspiration',
    name: 'Inspiration',
    component: ()=>import('@/views/inspiration.vue') 
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404' },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
