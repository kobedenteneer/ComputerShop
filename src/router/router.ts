import { createRouter, createWebHistory } from 'vue-router'
import { rolePermissions } from '@/constants/rolePermissions'
import { useUserStore } from '@/stores/userStore'

import ProductList from '../components/Product-list.vue'
import ProductDetail from '../components/Product-detail.vue'
import HomeView from '@/views/Home-View.vue'
import AdminView from '@/views/Admin-View.vue'
import AboutUsView from '@/views/AboutUs-View.vue'
import CartView from '@/views/Cart-View.vue'
import CheckoutView from '@/views/Checkout-View.vue'
import UnauthorizedView from '@/views/Unauthorized-View.vue'

const routes = [
  {
    path: '/order/:orderId',
    name: 'OrderDetails',
    component: CheckoutView,
    props: true,
  },
  { path: '/', component: HomeView },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetail, props: true },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAuth: true, roles: rolePermissions['Admin'] },
  },
  { path: '/cart', component: CartView },
  { path: '/about', component: AboutUsView },
  { path: '/contact', component: async () => await import('@/views/Contact-View.vue') },
  {
    path: '/unauthorized',
    component: UnauthorizedView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Nav guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (!userStore.user) {
    userStore.loadUserFromLocalStorage()
  }

  const requiresAuth = to.meta.requiresAuth
  const allowedRoles = to.meta.roles as string[] | undefined
  const userRole = userStore.user?.role

  if (requiresAuth && !userStore.isAuthenticated) {
    next('/unauthorized')
  } else if (requiresAuth && allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    next('/unauthorized')
  } else {
    next()
  }
})

export default router
