<template>
  <b-col md="12" lg="8">
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
        <ApexChart v-if="chartConfig" :chart="chartConfig" class="apex-charts" id="audience_overview" />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ApexChart from '@/components/ApexChart.vue'
import { BiEvangelismService } from '@/modules/dashboard/services/bi-evangelism.service'
import type { ISummaryEvangelismDaily } from '@/modules/dashboard/types/bi-evangelism.interface'
import { useChart } from '@/modules/dashboard/composables/useChart'
import { formatDateToPtBr } from '@/infra/helpers/helper'

const biEvangelismService = BiEvangelismService()
const chart = useChart()

const summaryData = ref<ISummaryEvangelismDaily[]>()
const chartConfig = ref()

onMounted(async () => {
  await fetchData()

  const total = summaryData.value?.map(({ total }) => total)
  const cells = summaryData.value?.map(({ cells }) => cells)
  const courses = summaryData.value?.map(({ courses }) => courses)
  const decision = summaryData.value?.map(({ decision }) => decision)
  const labels = summaryData.value?.map(({ date }) => formatDateToPtBr(date))

  chartConfig.value = chart.buildConfigChatArea(
    [
      {
        name: 'Pessoas Evangelizadas',
        data: total,
      },
      {
        name: 'Cursos',
        data: courses,
      },
      {
        name: 'Células',
        data: cells,
      },
      {
        name: 'Conversões',
        data: decision,
      },
    ],
    labels,
  )
})

const fetchData = async () => {
  const response = await biEvangelismService.getSummaryEvangelismDaily()
  summaryData.value = response.data
}
</script>
