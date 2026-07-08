<template>
  <PageBreadcrumb title="CRM" subtitle="Dashboard" />
  <BRow>
    <BCol sm="12" md="6">
      <ProjectsPerformanceOverview />
    </BCol>

    <BCol sm="12" md="6">
      <SummaryDailyEvangelismChat />
    </BCol>
  </BRow>
  <b-row class="justify-content-start">
    <SummaryDistrictWidget />
    <SummaryTeamWidget />
  </b-row>
</template>

<script setup lang="ts">
import SummaryWidget from '../components/SummaryWidget.vue'
import ProjectsPerformanceOverview from '../components/ProjectsPerformanceOverview.vue'
import SummaryDailyEvangelismChat from '@/modules/dashboard2/components/SummaryDailyEvangelismChat.vue'
import SummaryDistrictWidget from '@/modules/dashboard2/components/SummaryDistrictWidget.vue'
import SummaryTeamWidget from '../components/SummaryTeamWidget.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
