import EvangelismRecordIndex from '@/modules/evangelism/views/EvangelismRecordIndex.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    component: DefaultLayout,
    children: [
      {
        path: '/evangelism/factsheet',
        component: EvangelismRecordIndex,
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
