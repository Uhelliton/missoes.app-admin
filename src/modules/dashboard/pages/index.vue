<template>
  <PageBreadcrumb title="CRM" subtitle="Dashboard" />
  <BRow>
    <BCol v-for="(stat, idx) in crmStatData" :key="idx" md="6" xxl="3">
      <StatisticWidget :stat="stat" />
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="8">
      <YearlyOverview />
    </BCol>

    <BCol xl="4">
      <LeadSource />
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="12">
      <DealStatus />
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="4" lg="12">
      <TopPerformers />
    </BCol>

    <BCol xl="4" lg="6">
      <LocationBySession />
    </BCol>

    <BCol xl="4" lg="6">
      <RecentActivity />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { crmStatData } from '../components/data.ts'
import DealStatus from '../components/DealStatus.vue'
import LeadSource from '../components/LeadSource.vue'
import LocationBySession from '../components/LocationBySession.vue'
import RecentActivity from '../components/RecentActivity.vue'
import StatisticWidget from '../components/StatisticWidget.vue'
import TopPerformers from '../components/TopPerformers.vue'
import YearlyOverview from '../components/YearlyOverview.vue'
</script>
