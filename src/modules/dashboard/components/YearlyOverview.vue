<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Visão Geral <span class="text-muted fw-normal fs-base">(Evangelismo)</span></BCardTitle>
      <div>
        <BFormSelect
          v-model="year"
          class="form-control"
          placeholder="Selecione uma opção"
          @change="handleChangeYear($event)"
        >
          <option
            v-for="y in [2025, 2026]"
            :key="y"
            :value="y"
          >
            {{ y }}
          </option>
        </BFormSelect>
      </div>
    </BCardHeader>

    <BCardBody>
      <BRow>
        <BCol xl="12">
          <div dir="ltr">
            <div id="dash-revenue-chart" class="apex-charts">
              <ApexChart v-if="ready" :get-options="overViewChartOptions" :series="overViewChartOptions().series" />
            </div>
          </div>
        </BCol>
        <BCol xl="12">
          <div class="d-flex flex-wrap gap-3">
            <div v-for="(item, idx) in overviewData" :key="idx" class="flex-fill">
              <p :class="['text-muted mb-1']">{{ item.title }}</p>
              <h4 class="mb-2 d-flex align-items-center">
                <Icon :icon="item.icon" :class="item.iconClassName" />&nbsp;
                <span><CountUp :end-val="item.value" :options="{ decimalPlaces: Number.isInteger(item.value) ? 0 : 2, prefix: item.prefix || '', suffix: item.suffix || '' }" /></span>
              </h4>
              <span :class="['badge fs-12', item.change > 0 ? 'badge-soft-success' : item.change < 0 ? 'badge-soft-danger' : 'text-bg-light']">
                <template v-if="item.change > 0">
                  <Icon icon="chevron-up" />
                </template>
                <template v-else-if="item.change < 0">
                  <Icon icon="chevron-down" />
                </template>
                {{ Math.abs(item.change) }}%</span>
            </div>
          </div>
          <BButton variant="primary" size="sm" type="button" class="mt-3" @click="fetchData"><Icon icon="refresh" class="me-1" /> Atualizar</BButton>
        </BCol>
      </BRow>
    </BCardBody>
    <div v-if="isLoading" class="card-overlay" style="display: flex">
      <div class="spinner-border text-primary"></div>
    </div>
  </BCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import Icon from '~/components/wrappers/Icon.vue'
import CountUp from 'vue-countup-v3'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getColor } from '~/infra/utils/helpers.ts'
import { formatDateToPtBr } from '~/infra/utils/helper'
import type { OverviewType } from './data.ts'
import { BiEvangelismService } from '../services/bi-evangelism.service'
import type { ISummaryEvangelismDaily } from '../types/bi-evangelism.interface'
import { BCard, BCardHeader } from 'bootstrap-vue-next'

const biEvangelismService = BiEvangelismService()

const isLoading = ref(false)
const ready = ref(false)
const year = ref(new Date().getFullYear())

const overviewData = ref<OverviewType[]>([])
const chartSeries = ref<ApexOptions['series']>([])
const chartCategories = ref<string[]>([])

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}

const overviewStatsChunks = computed(() => chunkArray(overviewData.value, 2))

const overViewChartOptions = (): ApexOptions => ({
  series: chartSeries.value,

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
    getColor('chart-delta'), // Pessoas Evangelizadas
    getColor('chart-secondary'), // Cursos
    getColor('chart-alpha'), // Células
    getColor('chart-gamma'), // Conversões
  ],

  grid: { strokeDashArray: 1 },
  xaxis: {
    categories: chartCategories.value,
    axisBorder: { show: false },
    labels: { offsetY: 1 },
  },

  yaxis: {
    labels: {
      formatter: (val: number) => val + '',
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
    type: ['solid', 'gradient'],
    gradient: {
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
})

// Variação percentual entre o primeiro e o último ponto da série diária.
const computeChange = (series: number[]): number => {
  if (series.length < 2) return 0
  const first = series.find((v) => v > 0) ?? 0
  const last = series[series.length - 1] ?? 0
  if (!first) return 0
  return Number((((last - first) / first) * 100).toFixed(2))
}

const sum = (series: number[]): number => series.reduce((acc, v) => acc + v, 0)

const buildOverview = (daily: ISummaryEvangelismDaily[]) => {
  const totals = daily.map((d) => Number(d.total))
  const courses = daily.map((d) => Number(d.courses))
  const cells = daily.map((d) => Number(d.cells))
  const decisions = daily.map((d) => Number(d.decision))

  chartSeries.value = [
    { name: 'Pessoas Evangelizadas', type: 'bar', data: totals },
    { name: 'Cursos', type: 'area', data: courses },
    { name: 'Células', type: 'area', data: cells },
    { name: 'Conversões', type: 'bar', data: decisions },
  ]
  chartCategories.value = daily.map((d) => formatDateToPtBr(d.date))

  overviewData.value = [
    { title: 'Evangelizados', value: sum(totals), icon: 'users', iconClassName: 'text-primary me-1', change: computeChange(totals) },
    { title: 'Cursos', value: sum(courses), icon: 'book', iconClassName: 'text-info me-1', change: computeChange(courses) },
    { title: 'Células', value: sum(cells), icon: 'home-2', iconClassName: 'text-success me-1', change: computeChange(cells) },
    { title: 'Conversões', value: sum(decisions), icon: 'heart-handshake', iconClassName: 'text-warning me-1', change: computeChange(decisions) },
  ]
}

const handleChangeYear = (event: any) => {
  year.value = event.target.value
  fetchData()
}

const fetchData = async () => {
  isLoading.value = true
  ready.value = false
  try {
    const response = await biEvangelismService.getSummaryEvangelismDaily({ year: year.value })
    buildOverview(response.data ?? [])
    ready.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchData)
</script>
