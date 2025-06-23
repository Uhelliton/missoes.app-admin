<template>
  <b-row>
    <SummaryWidget />
    <SummaryDailyEvangelismChat />
  </b-row>
  <b-row class="justify-content-start">
    <SummaryDistrictWidget />
    <SummaryTeamWidget />
  </b-row>
</template>

<script setup lang="ts">
import SummaryWidget from '../components/SummaryWidget.vue'
import SummaryDailyEvangelismChat from '@/modules/dashboard/components/SummaryDailyEvangelismChat.vue'
import SummaryDistrictWidget from '@/modules/dashboard/components/SummaryDistrictWidget.vue'
import SummaryTeamWidget from '../components/SummaryTeamWidget.vue'
</script>
