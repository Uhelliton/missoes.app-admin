<template>
  <b-card no-body class="shadow-none border mb-3 mb-lg-0">
    <b-card-body>
      <b-row class="align-items-center">
        <b-col class="text-center">
          <i class="fs-24 align-self-center me-2" :class="item.icon"></i>
          <span class="fs-30 fw-semibold">{{ item.stat }}</span>
          <h6 class="text-uppercase text-muted mt-2 m-0">{{ item.title }}</h6>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { StatType } from '@/views/apps/analytics/customers/components/types'

defineProps({
  item: {
    type: Object as PropType<StatType>,
    required: true,
  },
})
</script>
