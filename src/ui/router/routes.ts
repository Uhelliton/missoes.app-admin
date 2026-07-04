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
    component: () => import('@/modules/auth/pages/Auth.vue'),
    meta: { layout: 'auth', requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: () => import('@/modules/dashboard/pages/index.vue'),
    meta: { layout: 'default', requiresAuth: true },
  },
  {
    path: '/people',
    component: () => import('@/modules/people/pages/PeopleIndex.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true,
      requiresAdmin: true // Apenas admins podem acessar
    },
  },
  {
    path: '/suppliers',
    component: () => import('@/modules/supplier/pages/SupplierIndex.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true,
      requiresAdmin: true // Apenas admins podem acessar
    },
  },
  {
    path: '/finance/payables',
    component: () => import('@/modules/finance/pages/income/index.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true,
      requiresAdmin: true // Apenas admins podem acessar
    },
  },
  {
    path: '/finance/receivables',
    component: () => import('@/modules/finance/pages/ReceivableIndex.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true,
      requiresAdmin: true // Apenas admins podem acessar
    },
  },
  {
    path: '/events',
    component: () => import('@/modules/events/pages/EventCalendar.vue'),
    meta: {
      layout: 'default',
      requiresAuth: true,
      requiresAdmin: true // Apenas admins podem acessar
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/modules/auth/pages/Auth.vue'),
    meta: { requiresAuth: false },
  },
];

export default routes;
