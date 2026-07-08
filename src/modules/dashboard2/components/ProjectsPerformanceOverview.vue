<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Projects Performance Overview</BCardTitle>
      <BDropdown toggle-class="btn btn-sm btn-default btn-icon" class="ms-auto" no-caret placement="bottom-end">
        <template #button-content>
          <Icon icon="dots-vertical" class="fs-lg" />
        </template>
        <BDropdownItem href=""> <Icon icon="chart-histogram" class="me-2" /> View Detailed Report </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="filter-2" class="me-2" /> Filter by Project </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="calendar" class="me-2" /> Select Date Range </BDropdownItem>
        <BDropdownItem href=""> <Icon icon="download" class="me-2" /> Export as CSV </BDropdownItem>
        <hr class="dropdown-divider" />
        <BDropdownItem class="text-danger" href=""> <Icon icon="refresh" class="me-2" /> Reset Analytics </BDropdownItem>
      </BDropdown>
    </BCardHeader>
    <BCardBody>
      <BRow class="text-center g-2">
        <BCol v-for="(item, idx) in performanceData" :key="idx">
          <div class="border bg-light-subtle border-dashed border-light p-2 rounded">
            <h4><CountUp :end-val="item.value" :options="{ prefix: item.prefix || '', suffix: item.suffix || '', decimalPlaces: Number.isInteger(item.value) ? 0 : 2 }" /></h4>
            <p class="mb-0 text-muted">{{ item.title }}</p>
          </div>
        </BCol>
      </BRow>
      <div dir="ltr">
        <div id="dash-projects-overviews" class="apex-charts">
          <ApexChart :get-options="performanceOverviewChartOptions" :series="performanceOverviewChartOptions().series" />
        </div>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import { performanceData, performanceOverviewChartOptions } from './data'
import CountUp from 'vue-countup-v3'
import ApexChart from '~/components/wrappers/ApexChart.vue'
</script>
