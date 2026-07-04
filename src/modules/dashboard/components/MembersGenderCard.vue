<template>
  <BCard no-body class="card-h-100">
    <BCardHeader class="justify-content-between">
      <BCardTitle>Membros por gênero</BCardTitle>
      <RouterLink to="/people" class="btn btn-sm btn-light"> Gestão de pessoas </RouterLink>
    </BCardHeader>

    <BCardBody>
      <div class="apex-charts">
        <ApexChart :get-options="donutOptions" :series="donutOptions().series" />
      </div>
      <BRow class="mt-2">
        <BCol v-for="(slice, idx) in porGenero" :key="slice.label" cols="12" sm="6">
          <div class="d-flex justify-content-between align-items-center p-1">
            <div>
              <Icon :icon="idx % 2 === 0 ? 'user' : 'users'" class="fs-16 align-middle me-1 text-primary" />
              <span class="align-middle fw-semibold ms-1">{{ slice.label }}</span>
            </div>
            <span class="fw-semibold text-muted">{{ slice.count }}</span>
          </div>
        </BCol>
      </BRow>
      <p v-if="criterioGraduados" class="text-muted small mb-0 mt-2">
        <strong>Graduados:</strong> {{ criterioGraduados }}
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import ApexChart from '~/components/wrappers/ApexChart.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { genesiisGenderDonutOptions } from './genesiis-charts.ts'

const props = defineProps<{
  porGenero: { label: string; count: number }[]
  criterioGraduados?: string
}>()

const donutOptions = () => genesiisGenderDonutOptions(props.porGenero)
</script>
