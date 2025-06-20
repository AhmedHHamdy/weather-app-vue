import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiredAuth: true }
    },
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: { requiredGuest: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: { requiredGuest: true }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   route level code-splitting
    //   this generates a separate chunk (About.[hash].js) for this route
    //   which is lazy-loaded when the route is visited.
    //   component: () => import('../views/LoginView.vue'),
    // }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.user) {
    await authStore.checkSession()
  }

  const requiredAuth = to.meta.requiredAuth
  const requiredGuest = to.meta.requiredGuest
  const isAuthenticated = authStore.isAuthenticated


  if (requiredAuth && !isAuthenticated) {
    next({ name: "login" })
    return
  }

  if (requiredGuest && isAuthenticated) {
    next({ name: "dashboard" })
    return
  }

  next()
})

export default router
