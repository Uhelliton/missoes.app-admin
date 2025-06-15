<template>
  <b-row>
    <CustomersData />
    <CustomersGrowth />
  </b-row>
  <CustomersDetails />
</template>
<script setup lang="ts">
import CustomersData from '../components/analytics/CustomersData.vue'
import CustomersGrowth from '../components/analytics/CustomersGrowth.vue'
import CustomersDetails from '../components/analytics/CustomersDetails.vue'
</script>
