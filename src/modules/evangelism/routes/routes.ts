import Dashboard from '@/modules/dashaboard/views/Dashboard.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
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
