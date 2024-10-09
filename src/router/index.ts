import { createRouter, createWebHistory } from 'vue-router';
import Movies from '../views/homepageTabs/Movies.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import CompanyInfo from '../views/homepageTabs/CompanyInfo.vue';
import RegisteredUsers from '../views/homepageTabs/RegisteredUsers.vue';

const routes = [
  { path: '/', component: Movies, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/company-info', component: CompanyInfo, meta: { requiresAuth: true } },
  { path: '/registered-users', component: RegisteredUsers, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!sessionStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
