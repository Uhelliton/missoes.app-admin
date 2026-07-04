<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Fluxo financeiro <span class="text-muted fw-normal fs-base">(últimos 12 meses)</span></BCardTitle>
      <RouterLink to="/finance/payables" class="btn btn-sm btn-light"> Contas a pagar </RouterLink>
    </BCardHeader>

    <BCardBody>
      <BRow>
        <BCol xl="4">
          <BRow v-for="(row, index) in overviewStatsChunks" :key="index" :class="index !== 0 ? 'mt-3' : ''">
            <BCol v-for="(item, idx) in row" :key="idx" sm="6">
              <p class="text-muted mb-1">{{ item.title }}</p>
              <h4 class="mb-2 d-flex align-items-center">
                <Icon :icon="item.icon" :class="item.iconClassName" />&nbsp;
                <span>
                  <CountUp
                    :end-val="item.value"
                    :options="{
                      decimalPlaces: (item.prefix?.trim() ?? '') === 'R$' ? 2 : 0,
                      prefix: item.prefix || '',
                      suffix: item.suffix || '',
                    }"
                  />
                </span>
              </h4>
              <span
                :class="[
                  'badge fs-12',
                  item.change > 0 ? 'badge-soft-success' : item.change < 0 ? 'badge-soft-danger' : 'text-bg-light',
                ]"
              >
                <template v-if="item.change > 0"><Icon icon="chevron-up" /></template>
                <template v-else-if="item.change < 0"><Icon icon="chevron-down" /></template>
                {{ Math.abs(item.change) }}%
              </span>
            </BCol>
          </BRow>
          <RouterLink to="/finance/receivables" class="btn btn-primary btn-sm mt-3" role="button">
            <Icon icon="arrow-right" class="me-1" /> Contas a receber
          </RouterLink>
        </BCol>
        <BCol xl="8">
          <div dir="ltr">
            <div class="apex-charts">
              <ApexChart :get-options="chartOptionsFn" :series="chartOptionsFn().series" />
            </div>
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import ApexChart from '~/components/wrappers/ApexChart.vue'
import CountUp from 'vue-countup-v3'
import { computed } from 'vue'
import type { FluxoFinanceiroMensal } from '../types/dashboard.types'
import type { GenesiisOverviewMini } from './genesiis-charts.ts'
import { genesiisFinancialFlowChartOptions } from './genesiis-charts.ts'

const props = defineProps<{
  fluxo: FluxoFinanceiroMensal
  miniStats: GenesiisOverviewMini[]
}>()

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size))

const overviewStatsChunks = computed(() => chunkArray(props.miniStats, 2))

const chartOptionsFn = () => genesiisFinancialFlowChartOptions(props.fluxo)
</script>
