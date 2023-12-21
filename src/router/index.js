import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/index.vue'
import ProductCreateView from '../views/Products/create.vue'
import EditView from '../views/Products/edit.vue'
import CategoryView from '../views/Category/Index.vue'
import CategoryCreateView from '../views/Category/Create.vue'
import CategoryEditView from '../views/Category/Edit.vue'

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
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/category/create',
      name: 'categoryCreate',
      component: CategoryCreateView
    },
    {
      path: '/category/:id/edit',
      name: 'categoryEdit',
      component: CategoryEditView
    },

  ]
})

export default router
