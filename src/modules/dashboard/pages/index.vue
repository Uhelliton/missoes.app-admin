<template>
  <PageBreadcrumb title="CRM" subtitle="Dashboard" />

  <StatisticWidgets />

  <BRow>
    <BCol xl="8">
      <YearlyOverview />
    </BCol>

    <BCol xl="4">
      <LeadSource />
    </BCol>
  </BRow>

  <BRow v-if="isAdministrator">
    <BCol xl="12">
      <TopPerformers />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import StatisticWidgets from '../components/StatisticWidgets.vue'
import LeadSource from '../components/LeadSource.vue'
import TopPerformers from '../components/TopPerformers.vue'
import YearlyOverview from '../components/YearlyOverview.vue'
import { useAuthStore } from '~/modules/auth/stores/auth.ts'
import { BRow } from 'bootstrap-vue-next'

const { isAdministrator } = useAuthStore()

</script>
