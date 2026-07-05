import type { MenuItemType } from '~/types'

// Menu completo (administrador / tenant global)
export const MENU_ITEMS: MenuItemType[] = [
  {
    'slug': 'main',
    'label': '',
    'isTitle': false,
    'children': [
      {
        'slug': 'dashboards',
        'icon': 'dashboard',
        'label': 'Dashboards',
        'url': '/dashboard',
      },
      {
        'slug': 'teams',
        'icon': 'users-group',
        'label': 'Equipes',
        'children': [
          {
            'slug': 'team.index',
            'label': 'Gerenciar Equipes',
            'url': '/teams',
          },
          {
            'slug': 'member.index',
            'label': 'Gerenciar Membros',
            'url': '/members',
          },
        ],
      },
      {
        'slug': 'evangelism',
        'icon': 'notebook',
        'label': 'Evangelismo',
        'children': [
          {
            'slug': 'evangelism.factsheet',
            'label': 'Lançamento de Fichas',
            'url': '/evangelism/factsheet',
          },
        ],
      },
      {
        'slug': 'project',
        'icon': 'category',
        'label': 'Projeto',
        'children': [
          {
            'slug': 'church.index',
            'label': 'Gestão de Igrejas',
            'url': '/churches',
          },
        ],
      },
    ],
  },
]

// Menu reduzido (usuário vinculado a uma equipe)
export const MENU_ITEMS_TEAM: MenuItemType[] = [
  {
    'slug': 'main',
    'label': 'Menu',
    'isTitle': true,
    'children': [
      {
        'slug': 'dashboards',
        'icon': 'dashboard',
        'label': 'Dashboards',
        'url': '/dashboard',
      },
    ],
  },
  {
    'slug': 'evangelism-section',
    'label': '',
    'isTitle': false,
    'children': [
      {
        'slug': 'evangelism',
        'icon': 'notebook',
        'label': 'Evangelismo',
        'children': [
          {
            'slug': 'evangelism.factsheet',
            'label': 'Lançamento de Fichas',
            'url': '/evangelism/factsheet',
          },
        ],
      },
    ],
  },
]

// Mantido para compatibilidade com consumidores existentes.
export const menuItems: MenuItemType[] = MENU_ITEMS
