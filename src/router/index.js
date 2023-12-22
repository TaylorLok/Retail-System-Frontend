import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/Products/index.vue'
import ProductCreateView from '../views/Products/create.vue'
import EditView from '../views/Products/edit.vue'
import registerView from '../views/Registration.vue'
import loginView from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {public:true},
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {public:true},
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
      path: '/register',
      name: 'register',
      component: registerView,
      meta:{public:true}
    },
    {
      path: '/login',
      name: 'login',
      component: loginView,
      meta:{public:true} //mark this as public route
    },

  ]
})

router.beforeEach((to, from, next) => {

  const isAuthenticated = !!localStorage.getItem('token');

    console.log('Navigating from:', from.name);
    console.log('Navigating to:', to.name);
    console.log('Is authenticated:', isAuthenticated);

    if(!to.meta.public && !isAuthenticated)
    {
      console.log('Redirecting to login page');
      next({name:'login'});
    }
    else if(to.meta.public && isAuthenticated)
    {
      console.log('Allowing access to public route');
      next();
    }
    else
    {
      console.log('Allowing access to authenticated route');
      next();
    }
});

router.beforeResolve(async (to, from, next) => {
  // Ensure that the route is fully resolved before checking authentication
  await next();
});

export default router
