import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AdminHomeView from '../views/AdminHomeView.vue';  
import ActivityOneView from '../views/ActivityOneView.vue';
import UserInformationView from '@/views/UserInformationView.vue';
import InformationView from '@/views/InformationView.vue';

const routes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, customerOnly: true } //customer only
  },
  {
    path: '/AdminHomeView',
    name: 'AdminHomeView',
    component: AdminHomeView,
    meta: { requiresAuth: true, adminOnly: true }  // admin only
  },
  { path: '/login', name: 'Login', component: LoginView },
  {
    path: '/activityone',
    name: 'ActivityOne',
    component: ActivityOneView,
    meta:{requiresAuth: true}
  },
  {
    path: '/UserInformation',
    name: 'UserInformation',
    component: UserInformationView,
    meta:{requiresAuth: true, adminOnly: true}
  },
  {
    path: '/Information',
    name: 'Information',
    component: InformationView
  }
]
})


const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); 
  const userRole = localStorage.getItem('userRole');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.matched.some(record => record.meta.adminOnly) && userRole !== 'admin') {
    next('/login');  // if not admin
  } else if (to.matched.some(record => record.meta.customerOnly) && userRole !== 'customer') {
    next('/login');  // if not customer
  } else if (to.path === '/login' && isAuthenticated) {
    // if user already login
    alert("You are logged in.")
    if (userRole === 'admin') {
      next('/AdminHomeView');
    } else if (userRole === 'customer') {
      next('/about');
    }
  }else{
    next(); // continue navigation
  }
});
export default router