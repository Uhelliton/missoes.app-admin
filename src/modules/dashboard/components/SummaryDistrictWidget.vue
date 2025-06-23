<template>
  <b-col md="6" lg="6">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Bairros x Evangelismo</b-card-title>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0" style="min-height: 300px">
        <b-table-simple responsive class="mb-0">
          <b-tbody>
            <b-tr v-for="(item, idx) in summaryData" :key="idx">
              <b-td class="px-0">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 text-truncate">
                    <h6 class="m-0 text-truncate">{{ item.district }}</h6>
                    <div class="d-flex align-items-center">
                      <div
                        class="progress bg-primary-subtle w-100"
                        style="height: 5px"
                        role="progressbar"
                        aria-label="Success example"
                        :aria-valuenow="toPercent(item.total)"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div class="progress-bar bg-primary" :style="`width: ${toPercent(item.total)}%`"></div>
                      </div>
                      <small class="flex-shrink-1 ms-1">{{ toPercent(item.total) }}%</small>
                    </div>
                  </div>
                </div>
              </b-td>
              <b-td class="px-0 text-end">
                <span class="text-body ps-2 align-self-center text-end">{{ item.total }}</span>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BiEvangelismService } from '@/modules/dashboard/services/bi-evangelism.service'
import type { ISummaryEvangelismDistrict } from '@/modules/dashboard/types/bi-evangelism.interface'

const biEvangelismService = BiEvangelismService()
const summaryData = ref<ISummaryEvangelismDistrict[]>([])

onMounted(async () => {
  await fetchData()
})

const totalSumRecord = computed(() => {
  return summaryData.value.reduce((sum, item) => sum + parseInt(item.total), 0)
})

const toPercent = (value: number) => {
  return Number((value / totalSumRecord.value) * 100).toFixed(2)
}

const fetchData = async () => {
  const response = await biEvangelismService.getSumEvangelismByDistricts()
  summaryData.value = response.data
}
</script>
