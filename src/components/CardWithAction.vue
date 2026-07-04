<template>
  <BCard v-if="isVisible" :class="[isCollapsed ? 'card-collapse' : '', className]" no-body>
    <BCardHeader :class="['d-flex justify-content-between align-items-center', isCollapsed ? 'border-0' : '']">
      <BCardTitle class="mb-0">
        {{ title }}
      </BCardTitle>

      <div class="d-flex align-items-center gap-2">
        <div v-if="isTogglable || isReloadable || isCloseable" class="card-action">
          <button v-if="isTogglable" class="card-action-item border-0" @click="isCollapsed = !isCollapsed">
            <IconifyIcon :icon="!isCollapsed ? 'tabler:chevron-up' : 'tabler:chevron-down'" />
          </button>

          <button v-if="isReloadable" class="card-action-item border-0" @click="reload">
            <IconifyIcon icon="tabler:refresh" />
          </button>

          <button v-if="isCloseable" class="card-action-item border-0" @click="isVisible = false">
            <IconifyIcon icon="tabler:x" />
          </button>
        </div>
      </div>
    </BCardHeader>

    <BCollapse :model-value="!isCollapsed">
      <BCardBody :class="bodyClass">
        <slot />
      </BCardBody>
    </BCollapse>

    <div v-if="isReloading" class="card-overlay d-flex">
      <div class="spinner-border text-primary"></div>
    </div>
  </BCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BCard, BCardHeader, BCardBody, BCollapse } from 'bootstrap-vue-next'
import { Icon as IconifyIcon } from '@iconify/vue'

defineProps<{
  title: string
  className?: string
  bodyClass?: string
  isTogglable?: boolean
  isReloadable?: boolean
  isCloseable?: boolean
}>()

const isCollapsed = ref(false)
const isReloading = ref(false)
const isVisible = ref(true)

function reload() {
  isReloading.value = true
  setTimeout(() => {
    isReloading.value = false
  }, 1500)
}
</script>
