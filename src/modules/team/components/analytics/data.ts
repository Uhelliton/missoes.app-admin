import type { ApexChartType } from '@/types'
import type { CustomerTableType, SocialStatType, StatType } from '@/views/apps/analytics/customers/components/types'


export const customerLineChart: ApexChartType = {
  height: 233,
  type: 'line',
  series: [
    {
      name: 'New Customers ',
      data: [0, 20, 15, 19, 14, 25, 30],
    },
    {
      name: 'Returning Customers',
      data: [0, 8, 7, 13, 26, 16, 25],
    },
  ],
  options: {
    chart: {
      fontFamily: 'inherit',
      height: 233,
      type: 'line',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
    grid: {
      show: true,
      strokeDashArray: 3,
    },
    stroke: {
      curve: 'smooth',
      colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
      width: 2,
    },
    markers: {
      colors: ['var(--bs-primary)', 'var(--bs-primary-bg-subtle)'],
      strokeColors: 'transparent',
    },
    tooltip: {
      x: {
        show: false,
      },
      followCursor: true,
    },
  },
}

export const customerStats: StatType[] = [
  {
    title: 'Total Evangelizados',
    icon: 'iconoir-community text-secondary',
    stat: '318',
  },
  {
    title: 'Cursos',
    icon: 'iconoir-book-stack text-secondary',
    stat: '18',
  },
  {
    title: 'Celulas',
    icon: 'iconoir-group text-secondary',
    stat: '12',
  },
  {
    title: 'Conversões',
    icon: 'iconoir-user-star text-secondary',
    stat: '33',
  },
]

export const socialStatData: SocialStatType[] = [
  {
    name: 'Twitter',
    clickCount: 2215,
    icon: 'icofont-twitter',
    audience: {
      count: 214,
      change: 1.9,
    },
    commission: {
      count: 3251,
      change: 0.5,
    },
    variant: 'bg-blue',
  },
  {
    name: 'Google',
    clickCount: 2154,
    icon: 'icofont-google-plus',
    audience: {
      count: 159,
      change: 2.5,
    },
    commission: {
      count: 1245,
      change: 0.7,
    },
    variant: 'bg-danger',
  },
  {
    name: 'Instagram',
    clickCount: 3251,
    icon: 'icofont-instagram',
    audience: {
      count: 124,
      change: 1.7,
    },
    commission: {
      count: 2514,
      change: 0.2,
    },
    variant: 'bg-warning',
  },
]
