import {createRouter, createWebHashHistory } from 'vue-router';
import HistoricalRoutes from '../modules/historical/router';
import AppLayout from '../layouts/app/AppLayout.vue';

const routes = [
  {
    path: '/',
    redirect: {path: '/historical/home'},
    component: AppLayout,
    children: [...HistoricalRoutes],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
