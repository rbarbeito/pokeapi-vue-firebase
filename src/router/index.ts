import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/view/HomeView.vue'
import { useAuthComposable } from '@/composable/authComposable';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/login', name: 'login', component: () => import('@/view/LoginView.vue'), meta: {
        authVerify: true,
      },
    },
    {
      path: '/register', name: 'register', component: () => import('@/view/RegisterView.vue'), meta: {
        authVerify: true,
      },
    },
    { path: '/profile', name: 'profile', component: () => import('@/view/ProfileView.vue') },
    { path: '/pokedex', name: 'pokedex', component: () => import('@/view/PokeView.vue') },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/view/ProfileView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],

})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const authVerify = to.matched.some((record) => record.meta.authVerify);
  const authComposable = useAuthComposable()

  if (requiresAuth && !(await authComposable.getCurrentUser())) {
    return next({ name: 'login' });
  }
  if (authVerify && (await authComposable.getCurrentUser())) {
    return next({ name: 'profile' });
  }
  next();
});





export default router
