import Dashboard from '@/modules/dashboard/views/Dashboard.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
        name: 'dashboard.index',
        meta: {
          title: 'Dashboard',
          authRequired: true,
        },
      },
    ],
  },
]

export default routes
