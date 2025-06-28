<template>
  <b-col md="12" lg="12">
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
import type { ISummaryEvangelismDistrict } from '@/modules/dashboard/types/bi-evangelism.interface'
import { useChart } from '@/modules/dashboard/composables/useChart'

const biEvangelismService = BiEvangelismService()
const chart = useChart()

const summaryData = ref<ISummaryEvangelismDistrict[]>()
const chartConfig = ref()

onMounted(async () => {
  await fetchData()

  const total = summaryData.value?.map(({ total }) => total)
  const labels = summaryData.value?.map(({ district }) => district)

  chartConfig.value = chart.buildConfigChatBar(
    [
      {
        name: 'Pessoas Evangelizadas',
        data: total,
      }
    ],
    labels,
  )
})

const fetchData = async () => {
  const response = await biEvangelismService.getSumEvangelismByDistricts()
  summaryData.value = response.data
}
</script>
