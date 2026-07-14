<template>
  <BRow class="position-relative">
    <BCol v-for="(stat, idx) in stats" :key="idx" md="6" xxl="3" class="position-relative z-10">
      <StatisticWidget :stat="stat" />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { getColor } from '~/infra/utils/helpers.ts'
import StatisticWidget from './StatisticWidget.vue'
import type { CrmStatType } from './data.ts'
import { BiEvangelismService } from '../services/bi-evangelism.service'
import type { ISummaryData, ISummaryEvangelismDaily } from '../types/bi-evangelism.interface'
import { BCol, BRow } from 'bootstrap-vue-next'

const biEvangelismService = BiEvangelismService()

const stats = ref<CrmStatType[]>([])
const year = ref(new Date().getFullYear())

const makeSparkline = (data: number[], colorKey: string): (() => ApexOptions) => {
  return () => ({
    chart: {
      type: 'area',
      height: 50,
      sparkline: { enabled: true },
    },
    series: [{ name: 'Total', data }],
    stroke: { width: 2, curve: 'smooth' },
    markers: { size: 0 },
    colors: [getColor(colorKey)],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
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
  })
}

// Variação percentual entre o primeiro e o último ponto da série diária.
const computeChange = (series: number[]): number => {
  if (series.length < 2) return 0
  const first = series.find((v) => v > 0) ?? 0
  const last = series[series.length - 1] ?? 0
  if (!first) return 0
  return Number((((last - first) / first) * 100).toFixed(2))
}

const buildStats = (summary: ISummaryData, daily: ISummaryEvangelismDaily[]): CrmStatType[] => {
  const totals = daily.map((d) => Number(d.total))
  const courses = daily.map((d) => Number(d.courses))
  const cells = daily.map((d) => Number(d.cells))
  const decisions = daily.map((d) => Number(d.decision))

  return [
    {
      title: 'Pessoas Evangelizadas',
      value: Number(summary.total),
      suffix: '',
      icon: 'users',
      change: computeChange(totals),
      label: 'no período',
      chartOptions: makeSparkline(totals, 'chart-primary'),
    },
    {
      title: 'Cursos',
      value: Number(summary.courses),
      suffix: '',
      icon: 'book',
      change: computeChange(courses),
      label: 'no período',
      chartOptions: makeSparkline(courses, 'chart-secondary'),
    },
    {
      title: 'Células',
      value: Number(summary.cells),
      suffix: '',
      icon: 'home-2',
      change: computeChange(cells),
      label: 'no período',
      chartOptions: makeSparkline(cells, 'chart-alpha'),
    },
    {
      title: 'Conversões',
      value: Number(summary.decision),
      suffix: '',
      icon: 'heart-handshake',
      change: computeChange(decisions),
      label: 'no período',
      chartOptions: makeSparkline(decisions, 'chart-gamma'),
    },
  ]
}

onMounted(async () => {
  const [summaryRes, dailyRes] = await Promise.all([
    biEvangelismService.getSummaryData({ year: year.value }),
    biEvangelismService.getSummaryEvangelismDaily({ year: year.value }),
  ])
  stats.value = buildStats(summaryRes.data, dailyRes.data ?? [])
})
</script>
