import Auth from '@/modules/auth/views/Login.vue'
import AuthLayout from '@/presentation/layouts/AuthLayout.vue'

const routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: Auth,
        name: 'auth.login',
      }
    ]
  }
]

export default routes
