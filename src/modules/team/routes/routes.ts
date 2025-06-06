import TeamIndex from '@/modules/team/views/TeamIndex.vue'
import MemberIndex from '@/modules/team/views/MemberIndex.vue'
import TeamAnalytics from '@/modules/team/views/TeamAnalytics.vue'
import DefaultLayout from '@/presentation/layouts/DefaultLayout.vue'

const routes = [
  {
    component: DefaultLayout,
    children: [
      {
        path: '/teams',
        component: TeamIndex,
        name: 'team.index',
        meta: {
          title: 'Gerenciar Equipes',
          authRequired: true,
        },
      },
      {
        path: '/members',
        component: MemberIndex,
        name: 'member.index',
        meta: {
          title: 'Gerenciar Membros',
          authRequired: true,
        },
      },
      {
        path: '/teams/:id/analytics',
        component: TeamAnalytics,
        name: 'team.analytics',
        meta: {
          title: 'Estatíticas de Equipe',
          authRequired: true,
        },
      },
    ],
  },
]

export default routes
