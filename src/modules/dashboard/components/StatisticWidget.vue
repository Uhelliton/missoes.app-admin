<template>
  <BCard no-body class="card-h-100">
    <BCardBody>
      <BRow class="align-items-center">
        <BCol cols="6">
          <h5 class="text-muted fs-sm text-uppercase text-truncate" title="Leads Generated">{{ stat.title }}</h5>
          <div class="d-flex align-items-center gap-2 my-3">
            <div class="avatar-md flex-shrink-0">
              <span class="avatar-title text-bg-light rounded-circle fs-22">
                <Icon :icon="stat.icon" />
              </span>
            </div>
            <h3 class="mb-0 fw-bold"><CountUp :end-val="stat.value" :options="{ decimalPlaces: 2, prefix: stat.prefix || '', suffix: stat.suffix || '' }" /></h3>
          </div>
          <p class="mb-0 text-muted">
            <span :class="['me-2', stat.change > 0 ? 'text-success' : 'text-danger']"
              >{{ Math.abs(stat.change) }}%
              <template v-if="stat.change > 0">
                <Icon icon="trending-up" class="ms-1" />
              </template>
              <template v-else>
                <Icon icon="trending-down" class="ms-1" />
              </template>
            </span>
            <span class="text-nowrap">{{ stat.label }}</span>
          </p>
        </BCol>

        <BCol cols="6">
          <div :class="stat.chartOptions().chart?.type === 'radialBar' ? 'd-flex justify-content-end' : 'text-end'">
            <ApexChart :get-options="stat.chartOptions" :series="stat.chartOptions().series" />
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import Icon from '~/components/wrappers/Icon.vue'
import type { CrmStatType } from './data.ts'

defineProps<{ stat: CrmStatType }>()
</script>
