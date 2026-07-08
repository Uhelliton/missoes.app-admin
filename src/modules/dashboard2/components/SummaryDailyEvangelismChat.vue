<template>
  <b-card no-body>
    <b-card-header>
      <b-row class="align-items-center">
        <div class="col">
          <b-card-title>Evangelismo Dia a Dia</b-card-title>
        </div>
        <div class="col-auto">
          <b-dropdown variant="light" menu-class="dropdown-menu-end">
            <template #button-content>
              <i class="icofont-calendar fs-5 me-1"></i> Ano 2025<i class="las la-angle-down ms-1"></i>
            </template>
            <b-dropdown-item>Hoje</b-dropdown-item>
            <b-dropdown-item>Semana</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
    </b-card-header>
    <b-card-body class="pt-0">
      <ApexChart v-if="chartConfig" :get-options="overViewChartOptions"  :series="overViewChartOptions().series" />
    </b-card-body>
  </b-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { BiEvangelismService } from '@/modules/dashboard2/services/bi-evangelism.service'
import type { ISummaryEvangelismDaily } from '@/modules/dashboard2/types/bi-evangelism.interface'
import { formatDateToPtBr } from '@/infra/utils/helper'
import type { ApexOptions } from 'apexcharts'
import { getColor } from '~/infra/utils/helpers.ts'

const biEvangelismService = BiEvangelismService()

const summaryData = ref<ISummaryEvangelismDaily[]>()
const chartConfig = ref()

const chartSeries = ref<ApexOptions['series']>([])
const chartCategories = ref<string[]>([])

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
      //   shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
})

onMounted(async () => {
  await fetchData()

  const data: ISummaryEvangelismDaily[] = summaryData.value ?? []

  chartSeries.value = [
    {
      name: 'Pessoas Evangelizadas',
      type: 'bar',
      data: data.map((item) => item.total),
    },
    {
      name: 'Cursos',
      type: 'area',
      data: data.map((item) => item.courses),
    },
    {
      name: 'Células',
      type: 'area',
      data: data.map((item) => item.cells),
    },
    {
      name: 'Conversões',
      type: 'bar',
      data: data.map((item) => item.decision),
    },
  ]

  chartCategories.value = data.map((item) => formatDateToPtBr(item.date))

  chartConfig.value = true
})

const fetchData = async () => {
  const response = await biEvangelismService.getSummaryEvangelismDaily()
  summaryData.value = response.data
}
</script>
