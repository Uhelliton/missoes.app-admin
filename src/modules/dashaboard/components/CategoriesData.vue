<template>
  <b-col md="6" lg="4">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Ranking por Equipe</b-card-title>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <ApexChart
          :chart="categoriesChart"
          class="apex-charts mt-n2"
          id="customers"
        />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import ApexChart from "@/components/ApexChart.vue";
import { categoriesChart } from "@/views/dashboards/ecommerce/components/data";
</script>
