<template>
  <b-col md="12" lg="7">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Evangelismo</b-card-title>
          </div>
          <div class="col-auto">
            <b-dropdown variant="light" menu-class="dropdown-menu-end">
              <template #button-content>
                <i class="icofont-calendar fs-5 me-1"></i> Ano 2025<i class="las la-angle-down ms-1"></i>
              </template>
              <b-dropdown-item>Hoje</b-dropdown-item>
              <b-dropdown-item>Semana</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <ApexChart :chart="customerLineChart" class="apex-charts" id="customers-line" />
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import ApexChart from '@/components/ApexChart.vue'
import { customerLineChart } from '@/views/apps/analytics/customers/components/data'
</script>
