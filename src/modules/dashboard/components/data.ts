import type { ApexOptions } from 'apexcharts'
import { getColor } from '~/infra/utils/helpers.ts'

const user1 = '/images/users/user-1.jpg'
const user2 = '/images/users/user-2.jpg'
const user3 = '/images/users/user-3.jpg'
const user4 = '/images/users/user-4.jpg'
const user5 = '/images/users/user-5.jpg'
const user6 = '/images/users/user-6.jpg'
const user7 = '/images/users/user-7.jpg'
const user8 = '/images/users/user-8.jpg'
const user9 = '/images/users/user-9.jpg'
const user10 = '/images/users/user-10.jpg'

const usFlag = '/images/flags/us.svg'
const inFlag = '/images/flags/in.svg'
const auFlag = '/images/flags/au.svg'

export type CrmStatType = {
  title: string
  value: number
  suffix: string
  prefix?: string
  icon: string
  change: number
  label: string
  chartOptions: () => ApexOptions
}

export const crmStatData: CrmStatType[] = [
  {
    title: 'Leads Generated',
    value: 48.2,
    suffix: 'k',
    icon: 'users',
    change: 5.12,
    label: '2.3k Up',
    chartOptions: () => ({
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Leads',
          data: [25, 28, 32, 38, 43, 55, 60, 48, 42, 51, 35],
        },
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      colors: [getColor('chart-primary')],
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return 'Leads'
            },
          },
        },
        marker: { show: false },
      },
      fill: {
        opacity: [1],
        type: ['gradient'],
        gradient: {
          type: 'vertical',
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
    }),
  },
  {
    title: 'Qualified Leads',
    value: 12.8,
    suffix: 'k',
    icon: 'user-check',
    change: -3.45,
    label: '0.4k Down',
    chartOptions: () => ({
      series: [70],
      chart: {
        type: 'radialBar',
        height: 90,
        width: 90,
      },
      stroke: {
        lineCap: 'round',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            show: false,
          },
        },
      },
      grid: {
        padding: {
          top: -20,
          bottom: -20,
          left: -20,
          right: -20,
        },
      },
      labels: ['Direct'],
      colors: [getColor('chart-primary')],
    }),
  },
  {
    title: 'Deals Closed',
    value: 9.75,
    suffix: 'k',
    icon: 'briefcase',
    change: 2.94,
    label: '1.1k Up',
    chartOptions: () => ({
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      series: [
        {
          name: 'Deals',
          data: [32, 45, 38, 52, 47, 66, 70, 64, 78, 72, 81],
        },
      ],
      stroke: {
        width: 2,
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      colors: [getColor('chart-primary'), getColor('chart-gamma'), getColor('chart-gray')],
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return 'Leads'
            },
          },
        },
        marker: { show: false },
      },
      fill: {
        opacity: [1],
        type: ['gradient'],
        gradient: {
          type: 'vertical',
          //   shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100],
        },
      },
    }),
  },
  {
    title: 'Revenue Generated',
    value: 5.63,
    prefix: '$',
    suffix: 'M',
    icon: 'currency-dollar',
    change: 4.21,
    label: '$32.4k Up',
    chartOptions: () => ({
      chart: {
        type: 'bar',
        height: 60,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          borderRadius: 4,
        },
      },
      colors: [getColor('chart-primary')],
      series: [
        {
          name: 'Revenue',
          data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
        },
      ],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: {
          formatter: (value: number): string => {
            return '$' + value
          },
          title: {
            formatter: function () {
              return 'Revenue'
            },
          },
        },
        marker: { show: false },
      },
    }),
  },
]

export type OverviewType = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
  iconClassName?: string
  change: number
}

export const overviewData: OverviewType[] = [
  {
    title: 'Revenue',
    value: 56.63,
    prefix: '$',
    suffix: 'k',
    icon: 'cash',
    iconClassName: 'text-success me-1',
    change: -3.91,
  },
  {
    title: 'Orders',
    value: 9842,
    icon: 'truck',
    iconClassName: 'text-info me-1',
    change: 8.72,
  },
  {
    title: 'New Users',
    value: 95.3,
    suffix: 'k',
    icon: 'users-group',
    change: 11.2,
  },
  {
    title: 'New Contract',
    value: 851,
    icon: 'heart-handshake',
    change: 0.0,
  },
]

export const overViewChartOptions = (): ApexOptions => ({
  series: [
    {
      name: 'Revenue',
      type: 'area',
      data: [28, 30, 42, 43, 45, 58, 62, 64, 63, 68, 72, 56],
    },
    {
      name: 'Deals Closed',
      type: 'line',
      data: [20, 22, 25, 28, 26, 24, 21, 26, 30, 32, 31, 34],
    },
    {
      name: 'New Leads',
      type: 'bar',
      data: [38, 45, 52, 48, 56, 62, 58, 66, 60, 72, 70, 76],
    },
    {
      name: 'Active Clients',
      type: 'bar',
      data: [18, 20, 19, 23, 22, 25, 27, 29, 28, 31, 32, 34],
    },
  ],

  chart: {
    type: 'line',
    height: 324,
    toolbar: { show: false },
    offsetX: 0,
  },

  stroke: {
    width: [2, 2, 0, 0],
    curve: 'smooth',
    dashArray: [0, 4, 0, 0],
  },

  colors: [
    getColor('chart-delta'), // Revenue
    getColor('chart-secondary'), // Deals Closed
    getColor('chart-alpha'), // New Leads
    getColor('chart-gamma'), // Clients
  ],

  grid: { strokeDashArray: 1 },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: { show: false },
    labels: { offsetY: 1 },
  },

  yaxis: {
    labels: {
      formatter: (val: number) => val + 'k',
      offsetX: -10,
    },
    axisBorder: { show: false },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 4,
    },
  },

  legend: { show: false },
  dataLabels: { enabled: false },
  markers: { size: 0 },

  fill: {
    opacity: [1, 1, 1, 1],
    type: ['gradient', 'solid'],
    gradient: {
      type: 'vertical',
      //   shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
})

export const leadSourceChartOptions = (): ApexOptions => ({
  chart: {
    height: 243,
    type: 'donut',
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },
  series: [112, 234, 88, 144],
  labels: ['Newsletter', 'Instagram', 'WhatsApp', 'Website'],
  colors: [getColor('chart-primary'), getColor('chart-secondary'), getColor('chart-alpha'), getColor('chart-gray')],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
})

export type DealType = {
  id: string
  name: string
  className: string
  company: string
  probability: number
  date: string
  user: {
    name: string
    image: string
  }
  value: number
  prefix: string
  suffix: string
  status: 'paused' | 'new' | 'cold-lead' | 'cancelled' | 'deal-won'
}

export const dealData: DealType[] = [
  {
    id: '#DH874',
    name: 'AdamM09',
    className: 'bg-primary-subtle text-primary',
    company: 'Rex Audio',
    probability: 3,
    date: '20 Apr, 2024',
    user: { name: 'Alexa Newsome', image: user1 },
    value: 100.1,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH809',
    name: 'Sensor Lecto',
    className: 'bg-success-subtle text-success',
    company: 'Morville',
    probability: 2,
    date: '31 Dec, 2024',
    user: { name: 'David Lee', image: user2 },
    value: 95,
    prefix: '$',
    suffix: 'K',
    status: 'new',
  },
  {
    id: '#DH807',
    name: 'Dhvanil',
    className: 'bg-info-subtle text-info',
    company: "Olson's Market",
    probability: 4,
    date: '05 Jun, 2024',
    user: { name: 'Peter Hein', image: user5 },
    value: 65.95,
    prefix: '$',
    suffix: 'K',
    status: 'cold-lead',
  },
  {
    id: '#DH805',
    name: 'KHCoal',
    className: 'bg-secondary-subtle text-secondary',
    company: "Erlebacher's",
    probability: 1,
    date: '25 Aug, 2024',
    user: { name: 'Gladys Rivas', image: user7 },
    value: 296.1,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
  {
    id: '#DH800',
    name: 'Haniyo',
    className: 'bg-warning-subtle text-warning',
    company: 'Colonial Stores',
    probability: 5,
    date: '30 Sep, 2024',
    user: { name: 'Joan Wisdom', image: user10 },
    value: 25.9,
    prefix: '$',
    suffix: 'K',
    status: 'deal-won',
  },
  {
    id: '#DH798',
    name: 'Lunotech',
    className: 'bg-primary-subtle text-primary',
    company: 'Northbridge Ltd',
    probability: 2,
    date: '12 Jan, 2025',
    user: { name: 'Chris Nolan', image: user3 },
    value: 78.3,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH792',
    name: 'TechHive',
    className: 'bg-success-subtle text-success',
    company: 'Urban Labs',
    probability: 3,
    date: '08 Mar, 2025',
    user: { name: 'Karen Miles', image: user4 },
    value: 120.4,
    prefix: '$',
    suffix: 'K',
    status: 'new',
  },
  {
    id: '#DH788',
    name: 'PixelForge',
    className: 'bg-warning-subtle text-warning',
    company: 'Bright Mart',
    probability: 1,
    date: '15 Jul, 2025',
    user: { name: 'Oscar Brent', image: user6 },
    value: 58.7,
    prefix: '$',
    suffix: 'K',
    status: 'cold-lead',
  },
  {
    id: '#DH780',
    name: 'RedCore',
    className: 'bg-danger-subtle text-danger',
    company: 'Highland Co.',
    probability: 1,
    date: '21 Feb, 2025',
    user: { name: 'Maria Jensen', image: user8 },
    value: 42.3,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
  {
    id: '#DH776',
    name: 'BluEdge',
    className: 'bg-success-subtle text-success',
    company: 'Arcton Energy',
    probability: 5,
    date: '10 Oct, 2024',
    user: { name: 'Daniel Cook', image: user9 },
    value: 310.2,
    prefix: '$',
    suffix: 'K',
    status: 'deal-won',
  },
  {
    id: '#DH770',
    name: 'CloudNova',
    className: 'bg-info-subtle text-info',
    company: 'Prime Retail',
    probability: 1,
    date: '28 May, 2025',
    user: { name: 'Emily Grace', image: user5 },
    value: 54.1,
    prefix: '$',
    suffix: 'K',
    status: 'paused',
  },
  {
    id: '#DH765',
    name: 'Finexa',
    className: 'bg-danger-subtle text-danger',
    company: 'Beacon Stores',
    probability: 1,
    date: '02 Feb, 2025',
    user: { name: 'Nathan Cole', image: user7 },
    value: 19.8,
    prefix: '$',
    suffix: 'K',
    status: 'cancelled',
  },
]

export type SaleExecutiveType = {
  user: {
    name: string
    designation: string
  }
  leads: number
  deals: number
  tasks: number
}

export const saleExecutiveData: SaleExecutiveType[] = [
  {
    user: {
      name: 'Jeremy Young',
      designation: 'Senior Sales Executive',
    },
    leads: 187,
    deals: 154,
    tasks: 49,
  },
  {
    user: {
      name: 'Thomas Krueger',
      designation: 'Senior Sales Executive',
    },
    leads: 235,
    deals: 127,
    tasks: 83,
  },
  {
    user: {
      name: 'Pete Burdine',
      designation: 'Senior Sales Executive',
    },
    leads: 365,
    deals: 148,
    tasks: 62,
  },
  {
    user: {
      name: 'Mary Nelson',
      designation: 'Senior Sales Executive',
    },
    leads: 753,
    deals: 159,
    tasks: 258,
  },
  {
    user: {
      name: 'Kevin Grove',
      designation: 'Senior Sales Executive',
    },
    leads: 458,
    deals: 126,
    tasks: 73,
  },
]

export type CountryType = {
  country: {
    name: string
    image: string
  }
  sessions: number
  users: number
  percentage: string
}

export const countryData: CountryType[] = [
  {
    country: {
      name: 'United States',
      image: usFlag,
    },
    sessions: 196584,
    users: 187232,
    percentage: '48.63%',
  },
  {
    country: {
      name: 'India',
      image: inFlag,
    },
    sessions: 145845,
    users: 126874,
    percentage: '36.08%',
  },
  {
    country: {
      name: 'Australia',
      image: auFlag,
    },
    sessions: 95845,
    users: 90127,
    percentage: '23.41%',
  },
]

export const sessionByCountryMapOption = () => ({
  map: 'world',
  zoomOnScroll: false,
  zoomButtons: true,

  regionStyle: {
    initial: {
      stroke: '#aab9d14d',
      strokeWidth: 0.25,
      fill: '#aab9d14d',
      fillOpacity: 1,
    },
    selected: {
      fill: getColor('primary'), // highlight color
    },
  },

  selectedRegions: ['AU', 'US', 'IN'],
})

export type ActivityType = {
  title: string
  description: string
  author: string
  icon: string
  iconClassName: string
}

export const activityData: ActivityType[] = [
  {
    title: '15 New Leads Added',
    description: 'Fresh inbound leads were captured from the website and synced automatically.',
    author: 'Olivia Carter',
    icon: 'user-plus',
    iconClassName: 'text-bg-primary',
  },
  {
    title: 'Lead Follow-Up Emails Sent',
    description: 'Follow-up messages were sent to all leads who have not responded within 48 hours.',
    author: 'Daniel Moore',
    icon: 'messages',
    iconClassName: 'text-bg-success',
  },
  {
    title: 'Sales Calls Logged',
    description: '20 outbound calls were recorded for prospects in the “Negotiation” stage.',
    author: 'Sophia Turner',
    icon: 'phone-call',
    iconClassName: 'text-bg-warning',
  },
  {
    title: 'Team Member Assigned to Deals',
    description: 'Three deals were reassigned to the senior sales team for faster conversion.',
    author: 'Liam Anderson',
    icon: 'users',
    iconClassName: 'text-bg-info',
  },
  {
    title: 'Deals Moved to Lost Stage',
    description: '4 deals were marked as “Lost” due to inactivity or declined proposals.',
    author: 'Ethan Brooks',
    icon: 'x',
    iconClassName: 'text-bg-danger',
  },
  {
    title: 'Two Deals Successfully Closed',
    description: 'Two high-value deals were marked “Won” and moved to the onboarding pipeline.',
    author: 'Ava Mitchell',
    icon: 'briefcase',
    iconClassName: 'text-bg-secondary',
  },
]
