<template>
  <router-link
    :class="`${currentRouteName === item.route?.name && 'active'} ${className}`"
    :to="{ name: item.route?.name, params: item.route?.params }"
  >
    <i class="menu-icon" :class="item.icon" v-if="item.icon" />
    <span> {{ item.label }} </span>
    <b-badge
      :variant="null"
      class="rounded text-success bg-success-subtle ms-1"
      v-if="item.badge"
    >
      {{ item.badge.text }}
    </b-badge>
  </router-link>
</template>

<script setup lang="ts">
import type { SubMenus } from "@/types/menu";
import { useRoute } from "vue-router";
import { computed } from "vue";

defineProps<SubMenus>();

const route = useRoute()

const currentRouteName = computed(() => route.name?.toString() ?? '')
</script>
