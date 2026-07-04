<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Overview <span class="text-muted fw-normal fs-base">(Current Year)</span></BCardTitle>
      <div>
        <button type="button" class="btn btn-light btn-sm me-1">All</button>
        <button type="button" class="btn btn-light btn-sm me-1">1M</button>
        <button type="button" class="btn btn-light btn-sm me-1">6M</button>
        <button type="button" class="btn btn-light active btn-sm">1Y</button>
      </div>
    </BCardHeader>

    <BCardBody>
      <BRow>
        <BCol xl="4">
          <div class="alert alert-warning d-flex align-items-center mb-3" role="alert">
            <Icon icon="database" class="fs-28 me-2" />
            <div class="fs-sm">
              We regret to inform you that our server is down. <strong><RouterLink to="" class="alert-link">Refresh</RouterLink></strong>
            </div>
          </div>

          <BRow v-for="(overview, index) in overviewStatsChunks" :key="index" :class="index != 0 ? 'mt-3' : ''">
            <BCol v-for="(item, idx) in overview" :key="idx" sm="6">
              <p :class="['text-muted mb-1']">{{ item.title }}</p>
              <h4 class="mb-2 d-flex align-items-center">
                <Icon :icon="item.icon" :class="item.iconClassName" />&nbsp;
                <span><CountUp :end-val="item.value" :options="{ decimalPlaces: item.suffix ? 2 : 0, prefix: item.prefix || '', suffix: item.suffix || '' }" /></span>
              </h4>
              <span :class="['badge fs-12', item.change > 0 ? 'badge-soft-success' : item.change < 0 ? 'badge-soft-danger' : 'text-bg-light']">
                <template v-if="item.change > 0">
                  <Icon icon="chevron-up" />
                </template>
                <template v-else-if="item.change < 0">
                  <Icon icon="chevron-down" />
                </template>
                {{ Math.abs(item.change) }}%</span
              >
            </BCol>
          </BRow>

          <BButton variant="primary" size="sm" type="button" class="mt-3" @click="refreshData"><Icon icon="refresh" class="me-1" /> Refresh Data</BButton>
        </BCol>
        <BCol xl="8">
          <div dir="ltr">
            <div id="dash-revenue-chart" class="apex-charts">
              <ApexChart :get-options="overViewChartOptions" :series="overViewChartOptions().series" />
            </div>
          </div>
        </BCol>
      </BRow>
    </BCardBody>
    <div v-if="isLoading" class="card-overlay" style="display: flex">
      <div class="spinner-border text-primary"></div>
    </div>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import { overViewChartOptions, overviewData } from './data.ts'
import CountUp from 'vue-countup-v3'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import { ref } from 'vue'

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))
}

const overviewStatsChunks = chunkArray(overviewData, 2)

const isLoading = ref(false)

const refreshData = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}
</script>
