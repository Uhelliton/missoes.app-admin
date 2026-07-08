import type { ApexOptions } from 'apexcharts'
import { getColor } from '~/infra/utils/helpers.ts'
import type { ApexChartType } from '@/types'
import type { OrderType, ProductType, SellingType, StatType } from '@/views/dashboards/ecommerce/components/types'


export const performanceData: any[] = [
  {
    title: 'Number of Projects',
    value: 7845,
  },
  {
    title: 'Active Projects',
    value: 289,
  },
  {
    title: 'Revenue',
    value: 982.5,
    prefix: '$',
    suffix: 'k',
  },
  {
    title: 'Working Hours',
    value: 12559,
    prefix: '~',
    suffix: 'h',
  },
]

export const performanceOverviewChartOptions = (): ApexOptions => ({
  series: [
    {
      name: 'Project Revenue',
      type: 'area',
      data: [30, 35, 40, 45, 50, 58, 62, 68, 72, 78, 80, 70], // Jan–Dec
    },
    {
      name: 'Project Orders',
      type: 'line',
      data: [20, 24, 28, 30, 33, 35, 38, 40, 42, 45, 48, 50], // Jan–Dec
    },
    {
      name: 'Project Users',
      type: 'bar',
      data: [15, 18, 22, 25, 28, 30, 35, 38, 40, 45, 48, 50], // Jan–Dec
    },
    {
      name: 'Active Projects Count',
      type: 'bar',
      data: [10, 12, 15, 18, 20, 24, 26, 28, 30, 35, 38, 40], // Jan–Dec
    },
  ],
  chart: {
    type: 'line',
    height: 321,
    toolbar: {
      show: false,
    },
    offsetX: 0,
  },
  stroke: {
    width: [2, 2, 0, 0],
    curve: 'smooth',
    dashArray: [0, 3, 0, 0],
  },
  colors: [getColor('chart-gray'), getColor('chart-gamma'), getColor('chart-primary'), getColor('chart-zeta')],
  grid: {
    strokeDashArray: 1,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    type: 'category',
    axisBorder: {
      show: false,
    },
    labels: {
      offsetY: 1,
    },
  },

  yaxis: {
    min: 0,
    labels: {
      formatter: function (val) {
        return val + 'k'
      },
      offsetX: -10,
    },
    axisBorder: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 3,
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  fill: {
    opacity: [0.2, 1, 1, 1],
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return '$' + value + 'k'
      },
    },
  },
})


export const monthlyIncomeChart: ApexChartType = {
  height: 270,
  type: 'bar',
  series: [
    {
      name: 'Pessoas Evangelizadas',
      data: [98, 102, 78, 116, 77, 115, 99, 81, 97, 60, 68, 55],
    },
  ],
  options: {
    chart: {
      height: 270,
      type: 'bar',

      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 5,
        // bottom: 5,
        // right: 0,
        blur: 5,
        color: '#45404a2e',
        opacity: 0.35,
      },
    },
    colors: [
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#22c55e',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
      '#95a0c5',
    ],
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
        columnWidth: '20',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val) {
      //   return val + "%";
      // },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#8997bd'],
      },
    },
    xaxis: {
      categories: [
        '01/07',
        '02/07',
        '03/07',
        '04/07',
        '05/07',
        '06/07',
        '07/07',
        '08/07',
        '09/07',
        '10/07',
        '11/07',
        '12/07',
      ],
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        // formatter: function (val) {
        //   return "$" + val + "k";
        // },
      },
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
      strokeDashArray: 2.5,
    },
    legend: {
      show: false,
    },
  },
}

export const customersChart: ApexChartType = {
  height: 280,
  type: 'donut',
  series: [50, 25, 25],
  options: {
    chart: {
      height: 280,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      // verticalAlign: 'middle',
      floating: false,
      fontSize: '13px',
      fontFamily: 'Be Vietnam Pro, sans-serif',
      offsetX: 0,
      offsetY: 0,
    },
    labels: ['Currenet', 'New', 'Retargeted'],
    colors: ['#22c55e', '#08b0e7', '#ffc728'],

    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            donut: {
              customScale: 0.2,
            },
          },
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' %'
        },
      },
    },
  },
}

export const categoriesChart: ApexChartType = {
  height: 275,
  type: 'bar',
  series: [
    {
      name: 'Items',
      data: [1380, 1100, 990, 880, 740, 548, 330, 200],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 275,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        distributed: true,
        barHeight: '85%',
        isFunnel: true,
        isFunnel3d: false,
      },
    },

    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      dropShadow: {
        enabled: false,
      },
      style: {
        colors: ['#22c55e'],
        fontWeight: 400,
        fontSize: '13px',
      },
    },
    xaxis: {
      categories: ['Mobile', 'Men Fishion', 'Women Fishion', 'Beauty', 'Health', 'Sports', 'Kids', 'Music'],
    },
    colors: [
      'rgba(34, 197, 94, 0.45)',
      'rgba(34, 197, 94, 0.4)',
      'rgba(34, 197, 94, 0.35)',
      'rgba(34, 197, 94, 0.3)',
      'rgba(34, 197, 94, 0.25)',
      'rgba(34, 197, 94, 0.2)',
      'rgba(34, 197, 94, 0.15)',
      'rgba(34, 197, 94, 0.1)',
    ],
    legend: {
      show: false,
    },
  },
}

export const statWidgetsChart: ApexChartType = {
  height: 35,
  type: 'line',
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  options: {
    chart: {
      type: 'line',
      width: 120,
      height: 35,
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 4,
        left: 0,
        // bottom: 0,
        // right: 0,
        blur: 2,
        color: 'rgba(132, 145, 183, 0.3)',
        opacity: 0.35,
      },
    },
    colors: ['#95a0c5'],
    stroke: {
      show: true,
      curve: 'smooth',
      width: [3],
      lineCap: 'round',
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return ''
          },
        },
      },
      marker: {
        show: false,
      },
    },
  },
}
