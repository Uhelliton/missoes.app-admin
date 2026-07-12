<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Evangelismo por Bairro</BCardTitle>
      <div>
        <button
          v-for="y in [2025, 2026]" :key="y"
          type="button" class="btn btn-light btn-sm me-1"
          :class="y === year ? 'active' : ''"
          @click="handleChangeYear(y)">
          {{ y }}
        </button>
      </div>
    </BCardHeader>

    <BCardBody>
      <div id="most-leads-chart" class="apex-charts">
        <ApexChart v-if="ready && series.length" :get-options="leadSourceChartOptions" :series="leadSourceChartOptions().series" />
        <p v-else-if="ready" class="text-muted text-center my-5">Sem dados disponíveis.</p>
      </div>

      <simplebar class="mt-2 pe-1" style="height: 200px">
        <div class="row g-0">
          <div v-for="(item, idx) in districts" :key="idx" class="col-6 d-flex justify-content-between align-items-center p-1">
            <div class="text-truncate">
              <span class="badge-dot me-1" :style="`background:${colorFor(idx)}`"></span>
              <span class="align-middle fw-semibold ms-1 text-truncate">{{ item.district }}</span>
            </div>
            <span class="fw-semibold text-muted flex-shrink-0 ms-1 d-flex gap-1 align-items-center">{{ toPercent(Number(item.total)) }}%</span>
          </div>
        </div>
      </simplebar>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ApexOptions } from 'apexcharts'
import simplebar from 'simplebar-vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { getColor } from '~/infra/utils/helpers.ts'
import { BiEvangelismService } from '../services/bi-evangelism.service'
import type { ISummaryEvangelismDistrict } from '../types/bi-evangelism.interface'

const biEvangelismService = BiEvangelismService()

const ready = ref(false)
const year = ref(new Date().getFullYear())
const districts = ref<ISummaryEvangelismDistrict[]>([])

const palette = ['chart-primary', 'chart-secondary', 'chart-alpha', 'chart-gray', 'chart-delta', 'chart-gamma']
const colorFor = (idx: number) => getColor(palette[idx % palette.length] ?? 'chart-primary')

const series = computed(() => districts.value.map((d) => Number(d.total)))
const labels = computed(() => districts.value.map((d) => d.district))

const totalSum = computed(() => series.value.reduce((acc, v) => acc + v, 0))
const toPercent = (value: number) => (totalSum.value ? Number((value / totalSum.value) * 100).toFixed(1) : '0.0')

const leadSourceChartOptions = (): ApexOptions => ({
  chart: {
    height: 243,
    type: 'donut',
  },
  legend: { show: false },
  stroke: { width: 0 },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: { showAlways: true, show: true },
        },
      },
    },
  },
  series: series.value,
  labels: labels.value,
  colors: districts.value.map((_, idx) => colorFor(idx)),
  dataLabels: { enabled: false },
  responsive: [
    {
      breakpoint: 480,
      options: { chart: { width: 200 } },
    },
  ],
})

const handleChangeYear = (y: number) => {
  year.value = y
  fetchData()
}

const fetchData = async () => {
  const response = await biEvangelismService.getSumEvangelismByDistricts({ year: year.value })
  districts.value = response.data ?? []
  ready.value = true
}

onMounted(async () => {
  await fetchData()
})
</script>
