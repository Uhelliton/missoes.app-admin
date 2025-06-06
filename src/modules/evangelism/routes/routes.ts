import Factsheet from '@/modules/evangelism/views/Factsheet.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    component: DefaultLayout,
    children: [
      {
        path: '/evangelism/factsheet',
        component: Factsheet,
        name: 'evangelism.factsheet',
        meta: {
          title: 'Ficha de Evangelismo',
          authRequired: true,
        },
      },
    ],
  },
]

export default routes
