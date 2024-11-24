import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cartpage.vue'),
    },
    {
      path: '/product/:sku',
      name: 'product',
      component: () => import('../views/Productpage.vue'),
    },
  ],
})

export default router
