import Auth from '@/modules/auth/views/Login.vue'
import AuthLayout from '@/presentation/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/auth/login',
    component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        component: Auth,
        name: 'auth.login',
      }
    ]
  }
]

export default routes
