import type { ApexChartType } from '@/types'

export type IChatSeries = {
  name: string
  data: number[]
}

export const useChart = () => {
  const buildConfigChatArea = (series: IChatSeries[], labels: string[]): ApexChartType => {
    return {
      height: 280,
      type: 'area',
      series: series,
      options: {
        chart: {
          height: 280,
          type: 'area',
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
            top: 12,
            left: 0,
            // bottom: 0,
            // right: 0,
            blur: 2,
            color: 'rgba(132, 145, 183, 0.3)',
            opacity: 0.35,
          },
        },
        annotations: {
          xaxis: [
            {
              x: 312,
              strokeDashArray: 4,
              borderWidth: 1,
              borderColor: 'var(--bs-secondary)',
            },
          ],
          points: [
            {
              x: 312,
              y: 52,
              marker: {
                size: 6,
                fillColor: 'var(--bs-primary)',
                strokeColor: 'var(--bs-card-bg)',
                strokeWidth: 4,
              },
              label: {
                borderWidth: 1,
                offsetY: -110,
                text: 'meta: 200 pessoas',
                style: {
                  background: 'var(--bs-primary)',
                  fontSize: '14px',
                  fontWeight: '600',
                },
              },
            },
          ],
        },
        colors: ['#22c55e', 'rgba(106, 155, 155, 0.3)'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
          width: [3, 3],
          dashArray: [0, 0],
          lineCap: 'round',
        },
        labels: labels,

        yaxis: {
          labels: {
            offsetX: -12,
            offsetY: 0,
          },
        },
        grid: {
          strokeDashArray: 3,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        legend: {
          show: false,
        },

        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: !1,
            opacityFrom: 0.05,
            opacityTo: 0.05,
            stops: [45, 100],
          },
        },
      },
    }
  }

  const buildConfigChatBar = (series: IChatSeries[], labels: string[], colors: string[]): ApexChartType => {
    return {
      height: 275,
      type: 'bar',
      series: series,
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
          categories: labels,
        },
        colors: [
          'rgb(39, 159, 253)',
          'rgb(33, 233, 169)',
          'red',
          'yellow',
          'purple',
          'rgb(142, 117, 211)',
          'grey',
          'rgb(253, 189, 57)',
        ],
        legend: {
          show: false,
        },
      },
    }
  }

  return {
    buildConfigChatArea,
    buildConfigChatBar,
  }
}
