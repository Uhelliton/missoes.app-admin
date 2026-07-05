import { type RouteRecordRaw } from 'vue-router';

// Interface para meta das rotas
declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'auth' | 'default';
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/modules/auth/pages/Login.vue'),
    name: 'auth.login',
    meta: { layout: 'auth', requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: () => import('@/modules/dashboard/pages/index.vue'),
    meta: { layout: 'default', requiresAuth: true },
  },
  {
    path: '/evangelism/factsheet',
    component: () => import('@/modules/evangelism/pages/EvangelismRecordIndex.vue'),
    name: 'evangelism.factsheet',
    meta: { layout: 'default', requiresAuth: true, },
  },
];

export default routes;
