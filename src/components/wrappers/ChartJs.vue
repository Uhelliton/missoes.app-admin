<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables, type ChartOptions, type ChartData, type ChartType, type Plugin } from 'chart.js'
import { merge } from 'lodash-es'
import { getColor } from '~/infra/utils/helpers'
import { useLayout } from '~/stores/layout'
import { storeToRefs } from 'pinia'

type Props = {
  type: ChartType
  height?: string | number
  width?: string | number
  getOptions: () => { data: ChartData; options: ChartOptions }
  plugins?: Plugin[]
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  height: '100%',
  width: '100%',
  plugins: () => [],
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const layoutStore = useLayout()
const { layout } = storeToRefs(layoutStore)
function getDefaultChartOptions(): ChartOptions {
  if (typeof window === 'undefined') return {}

  const bodyFont = getComputedStyle(document.body).fontFamily.trim()

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: -10 } },
    scales: {
      x: {
        ticks: {
          font: { family: bodyFont },
          color: getColor('secondary-color'),
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          font: { family: bodyFont },
          color: getColor('secondary-color'),
        },
        grid: {
          display: true,
          color: getColor('chart-border-color'),
          lineWidth: 1,
        },
        border: {
          display: false,
          dash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { family: bodyFont },
          color: getColor('secondary-color'),
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        titleFont: { family: bodyFont },
        bodyFont: { family: bodyFont },
      },
    },
  }
}

Chart.register(...registerables, ...(props.plugins || []))

function renderChart() {
  if (!canvasRef.value) return

  const { data, options } = props.getOptions()
  const mergedOptions = merge({}, getDefaultChartOptions(), options)

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(canvasRef.value, {
    type: props.type,
    data,
    options: mergedOptions,
    plugins: props.plugins,
  })
}

onMounted(() => {
  renderChart()
})

watch([() => layout.value.theme, () => layout.value.skin], () => {
  renderChart()
})
</script>

<template>
  <div :style="{ width: props.width, height: props.height, ...props.style }">
    <canvas ref="canvasRef" />
  </div>
</template>
