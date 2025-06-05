import ChurchIndex from '@/modules/project/views/ChurchIndex.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/churches',
        component: ChurchIndex,
        name: 'church.index',
        meta: {
          title: 'Gerenciar Igrejas',
          authRequired: true,
        },
      },
    ],
  },
]

export default routes
