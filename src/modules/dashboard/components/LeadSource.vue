<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Lead Source</BCardTitle>
      <div>
        <RouterLink to="" class="btn btn-sm btn-default me-1"><Icon icon="cloud-upload" class="me-1" /> Export</RouterLink>
        <RouterLink to="" class="btn btn-sm btn-light"><Icon icon="download" class="me-1" /> Import</RouterLink>
      </div>
    </BCardHeader>

    <BCardBody>
      <div id="most-leads-chart" class="apex-charts">
        <ApexChart :get-options="leadSourceChartOptions" :series="leadSourceChartOptions().series" />
      </div>

      <BRow class="mt-2">
        <BCol>
          <div class="d-flex justify-content-between align-items-center p-1">
            <div>
              <Icon icon="speakerphone" class="fs-16 align-middle me-1 text-primary" />
              <span class="align-middle fw-semibold ms-1">Newsletter</span>
            </div>
            <span class="fw-semibold text-muted float-end d-flex gap-1 align-items-center"> <Icon icon="chevron-up" class="text-success" /> 6.37% </span>
          </div>

          <div class="d-flex justify-content-between align-items-center p-1">
            <div>
              <Icon icon="user-hexagon" class="fs-16 align-middle me-1 text-danger" />
              <span class="align-middle fw-semibold ms-1">Instagram</span>
            </div>
            <span class="fw-semibold text-muted float-end d-flex gap-1 align-items-center"> <Icon icon="chevron-up" class="text-success" /> 34.8% </span>
          </div>
        </BCol>

        <BCol>
          <div class="d-flex justify-content-between align-items-center p-1">
            <div>
              <Icon icon="settings-2" class="fs-16 align-middle me-1 text-success" />
              <span class="align-middle fw-semibold ms-1">WhatsApp</span>
            </div>
            <span class="fw-semibold text-muted float-end d-flex gap-1 align-items-center"> <Icon icon="chevron-down" class="text-danger" /> 8.9% </span>
          </div>

          <div class="d-flex justify-content-between align-items-center p-1">
            <div>
              <Icon icon="world" class="fs-16 align-middle me-1 text-warning" />
              <span class="align-middle fw-semibold ms-1">Website</span>
            </div>
            <span class="fw-semibold text-muted float-end d-flex gap-1 align-items-center"> <Icon icon="chevron-up" class="text-success" />44.3% </span>
          </div>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import ApexChart from '~/components/wrappers/ApexChart.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { leadSourceChartOptions } from './data.ts'
</script>
