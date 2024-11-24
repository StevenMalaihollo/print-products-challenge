import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

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
      component: () => import('../views/Cart.vue'),
    },
    {
      path: '/product/:sku',
      name: 'product',
      component: () => import('../views/Product.vue'),
    },
  ],
})

export default router
