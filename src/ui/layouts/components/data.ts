import type { MenuItemType } from '~/types'

export const menuItems: MenuItemType[] = [
  {
    'icon': 'dashboard',
    'slug': 'main',
    'label': '',
    'isTitle': true,
    'children': [
      {
        'icon': 'dashboard',
        'slug': 'dashboards',
        'label': 'Dashboards',
        'url': '/dashboard',
      },
    ],
  },
  {
    'icon': 'apps',
    'slug': 'congrations',
    'label': '',
    'isTitle': true,
    'children': [
      {
        'icon': 'password-user',
        'slug': 'secretary',
        'label': 'Secretária',
        'children': [
          {
            'url': '/',
            'icon': 'category',
            'slug': 'category',
            'label': 'Ministérios',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Carteria de Membros',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Relatórios',
          }
        ]
      },
      {
        'icon': 'users',
        'slug': 'people-management',
        'label': 'Gestão de Pessoas',
        'children': [
          {
            'url': '/people',
            'icon': 'category',
            'slug': 'pages:apps-ecommerce-categories',
            'label': 'Gerenciamento de Pessoas',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Famílias',
          }
        ]
      },
      {
        'icon': 'wallet',
        'slug': 'finance',
        'label': 'Financeiro',
        'children': [
          {
            'url': '/',
            'icon': 'category',
            'slug': 'pages:apps-ecommerce-categories',
            'label': 'Visão Resumida',
          },
          {
            'url': '/finance/payables',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Contas a Pagar',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Contas a Receber',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Movimentações Financeiras',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Relatórios',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Configurações',
          }
        ]
      },
      {
        'icon': 'rocket',
        'slug': 'events',
        'label': 'Eventos & Comunicação',
        'children': [
          {
            'url': '/',
            'icon': 'category',
            'slug': 'pages:apps-ecommerce-categories',
            'label': 'Gerenciar Eventos',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Inscrições / Participantes',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Comunicação',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Campanhas / Avisos',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Templates de Mensagem',
          },
        ]
      },
      {
        'icon': 'users-group',
        'slug': 'groups',
        'label': 'Células / Grupos',
        'children': [
          {
            'url': '/',
            'icon': 'category',
            'slug': 'pages:apps-ecommerce-categories',
            'label': 'Dashboard',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Gestão de Células',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Gestão de Membros',
          },
          {
            'url': '/',
            'icon': 'users',
            'slug': 'pages:apps-ecommerce-customers',
            'label': 'Relatórios',
          },
        ]
      }
    ]
  },
  {
    'icon': '',
    'slug': '',
    'label': '',
    'isTitle': true,
    'children': [],
  },
  {
    'icon': '',
    'slug': 'main',
    'label': 'Configurações',
    'isTitle': true,
    'children': [
      {
        'icon': 'credit-card-refund',
        'slug': 'dashboards',
        'label': 'Assinaturas e Planos',
        'url': '/',
        'children': [
          {
            'icon': 'credit-card-refund',
            'slug': 'secretary',
            'label': 'Minha Assinatura',
          }
        ]
      },
      {
        'icon': 'user-hexagon',
        'slug': 'dashboards',
        'label': 'Usuários e Permissões',
        'url': '/',
        'children': [
          {
            'icon': 'password-user',
            'slug': 'secretary',
            'label': 'Gestão de Usuários',
          },
          {
            'icon': 'password-user',
            'slug': 'secretary',
            'label': 'Gestão de Permissões',
          }
        ]
      },
    ],
  },
]
