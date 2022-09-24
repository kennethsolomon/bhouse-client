import Parse from 'parse'
import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from '@/helpers/AuthGuard.js'

import Dashboard from "../views/dashboard/Dashboard.vue";
import SignIn from '../views/auth/SignIn.vue'
import NotFound from '../views/error/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard
  },
  {
    path: '/boarder',
    name: 'Boarder',
    components: {
      admin: () => import('../views/boarder/index.vue'),
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: '/auth/signin',
    name: 'Sign In',
    component: SignIn,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
    // component: () => import('../views/error/NotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
