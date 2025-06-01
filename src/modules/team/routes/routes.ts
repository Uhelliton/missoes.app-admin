import TeamIndex from '@/modules/team/views/TeamIndex.vue'
import MemberIndex from '@/modules/team/views/MemberIndex.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/teams',
        component: TeamIndex,
        name: 'team.index',
      },
      {
        path: '/members',
        component: MemberIndex,
        name: 'member.index',
      },
    ],
  },
]

export default routes
