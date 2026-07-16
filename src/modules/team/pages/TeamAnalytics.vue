<template>
  <TeamPerformers />
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { BiEvangelismService } from '~/modules/dashboard/services/bi-evangelism.service.ts'
import TeamPerformers from '~/modules/team/components/analytics/TeamPerformers.vue'

const biEvangelismService = BiEvangelismService()

onMounted(async () => {
  const response = await biEvangelismService.getSummaryEvangelismDaily({ year: 2026, teamId: 23 })
})
</script>
