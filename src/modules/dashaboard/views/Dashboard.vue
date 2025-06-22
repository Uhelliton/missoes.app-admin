<template>
  <b-row>
    <SummaryWidget  />
    <SummaryDailyEvangelismChat />
  </b-row>
  <b-row class="justify-content-center" style="display: none">
    <TopSelling />
    <CategoriesData />
    <RecentsOrder />
  </b-row>
</template>
<script setup lang="ts">

import TopSelling from "../components/TopSelling.vue";
import CategoriesData from "../components/CategoriesData.vue";
import RecentsOrder from "../components/RecentsOrder.vue";
import SummaryWidget from "../components/SummaryWidget.vue";
import SummaryDailyEvangelismChat from "@/modules/dashaboard/components/SummaryDailyEvangelismChat.vue";
</script>
