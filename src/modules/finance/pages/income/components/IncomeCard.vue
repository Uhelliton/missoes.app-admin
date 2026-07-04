<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between align-items-center">
        <div class="avatar fs-60 avatar-img-size flex-shrink-0">
          <span :class="`avatar-title ${item.className} rounded-circle fs-24`">
            <Icon :icon="item.icon" />
          </span>
        </div>
        <div class="text-end">
          <h3 class="mb-2 fw-normal">
            {{ item.prefix
            }}
              <CountUp class="d-inline-flex" :endVal="item.value" :duration="2" :startVal="0" />
            
          </h3>
          <p class="mb-0 text-muted">
            <span>{{ item.title }}</span>
          </p>
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'
import Icon from '~/components/wrappers/Icon.vue'
import type { StatType } from './data'
defineProps<{ item: StatType }>()
</script>
