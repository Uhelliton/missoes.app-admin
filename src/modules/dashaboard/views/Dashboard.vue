<template>
  <b-row>
    <SummaryWidget  />
    <MonthlyAvgIncome />
  </b-row>
<!--  <b-row class="justify-content-center">-->
<!--    <PopularProducts />-->
<!--    <Customers />-->
<!--  </b-row>-->
  <b-row class="justify-content-center">
    <TopSelling />
    <CategoriesData />
    <RecentsOrder />
  </b-row>
</template>
<script setup lang="ts">
import StatWidgets from "../components/StatWidgets.vue";
import MonthlyAvgIncome from "../components/MonthlyAvgIncome.vue";
import PopularProducts from "../components/PopularProducts.vue";
import Customers from "../components/Customers.vue";
import TopSelling from "../components/TopSelling.vue";
import CategoriesData from "../components/CategoriesData.vue";
import RecentsOrder from "../components/RecentsOrder.vue";
import SummaryWidget from "../components/SummaryWidget.vue";
import DefaultLayout from "@/presentation/layouts/DefaultLayout.vue";
</script>
