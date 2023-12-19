import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/index.vue'
import ProductCreateView from '../views/Products/create.vue'
import EditView from '../views/Products/edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/products/create',
      name: 'productCreate',
      component: ProductCreateView
    },
    {
      path: '/product/:id/edit',
      name: 'productEdit',
      component: EditView
    },

  ]
})

export default router
