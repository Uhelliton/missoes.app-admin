<template>
  <BCard no-body class="card-h-100">
    <BCardHeader>
      <BCardTitle>Atividade recente</BCardTitle>
    </BCardHeader>

    <simplebar class="card-body" style="max-height: 426px">
      <div class="timeline timeline-users">
        <div v-for="(activity, idx) in genesiisActivityData" :key="idx" class="timeline-item d-flex align-items-stretch">
          <div :class="['timeline-dot', activity.iconClassName]">
            <Icon :icon="activity.icon" class="fs-md" />
          </div>
          <div :class="['timeline-content ps-3', genesiisActivityData.length - 1 !== idx ? 'pb-4' : '']">
            <h5 class="mb-1">{{ activity.title }}</h5>
            <p class="mb-1 text-muted">{{ activity.description }}</p>
            <span class="text-primary fw-semibold">{{ activity.author }}</span>
          </div>
        </div>
      </div>
    </simplebar>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import simplebar from 'simplebar-vue'
import { genesiisActivityData } from './genesiis-charts.ts'
</script>
