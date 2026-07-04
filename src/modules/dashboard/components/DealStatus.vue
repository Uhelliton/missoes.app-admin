<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <BCardTitle>Deal Status</BCardTitle>

      <div class="d-flex align-items-center gap-2">
        <span class="me-2 fw-semibold">Filter By:</span>

        <div class="app-search">
          <BFormSelect v-model="status" class="form-control my-1 my-md-0">
            <option value="All">Deal Status</option>
            <option value="Paused">Paused</option>
            <option value="New">New</option>
            <option value="Cold Lead">Cold Lead</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Deal Won">Deal Won</option>
          </BFormSelect>
          <Icon icon="briefcase" class="app-search-icon text-muted" />
        </div>

        <div class="app-search">
          <BFormInput type="search" v-model="searchQuery" placeholder="Search deals..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <div>
          <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
        </div>
      </div>
    </BCardHeader>

    <BTable
      show-empty
      :filter="searchQuery"
      empty-text="Nothing found."
      thead-class="bg-light align-middle bg-opacity-25 thead-sm"
      hover
      :fields="fields"
      :items="deals"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      responsive
      class="table table-custom table-nowrap table-centered mb-0 w-100"
    >
      <template #head(action)> ••• </template>
      <template #head()="data">
        <span class="text-uppercase fs-xxs">{{ data.label }}</span>
      </template>
      <template #cell(id)="{ item }">
        <RouterLink to="" class="fw-medium text-reset">{{ item.id }}</RouterLink>
      </template>
      <template #cell(name)="{ item }">
        <div class="avatar-xs d-inline-block me-1">
          <span :class="['avatar-title  fw-bold rounded-circle', item.className]"> {{ item.name.charAt(0).toUpperCase() }} </span>
        </div>
        <RouterLink to="" class="text-reset">{{ item.name }}</RouterLink>
      </template>
      <template #cell(pipeline)="{ item }">
        <div class="progress progress-lg progress-with-border rounded-0" style="width: 194px">
          <div v-for="(step, idx) in steps" :key="idx" :class="['progress-bar ', idx < item.probability ? getBarColor(item.probability) : 'bg-light']" data-bs-toggle="tooltip" data-bs-title="step" role="progressbar" style="width: 20%"></div>
        </div>
      </template>
      <template #cell(userResponsible)="{ item }">
        <img :src="item.user.image" alt="" class="avatar-xs rounded-circle me-1" />
        <RouterLink to="" class="text-body fw-medium">{{ item.user.name }}</RouterLink>
      </template>
      <template #cell(value)="{ item }">
        <div class="text-nowrap">USD {{ item.prefix }}{{ item.value }}{{ item.suffix }}</div>
      </template>
      <template #cell(status)="{ item }">
        <span
          :class="[
            'badge p-1',
            item.status === 'cancelled' ? 'bg-danger-subtle text-danger' : item.status === 'cold-lead' ? 'bg-warning-subtle text-warning' : item.status === 'paused' ? 'bg-info-subtle text-info' : item.status === 'new' ? 'text-bg-light' : 'bg-success-subtle text-success',
          ]"
          >{{ toPascalCase(item.status) }}</span
        >
      </template>
      <template #cell(action)>
        <RouterLink to="" class="text-muted fs-20">
          <Icon icon="edit" />
        </RouterLink>
      </template>
    </BTable>
    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="deals" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import TablePagination from '~/components/TablePagination.vue'
import { toPascalCase } from '~/infra/utils/helpers.ts'
import { dealData, type DealType } from './data.ts'
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'

const getBarColor = (probability: number) => {
  if (probability <= 1) return 'bg-danger'
  return 'bg-success'
}

const fields: Exclude<TableFieldRaw<DealType>, string>[] = [
  { key: 'id', label: 'Deal Id', sortable: true },
  { key: 'name', label: 'Deal Name', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'pipeline', label: 'Pipeline', sortable: false },
  { key: 'date', label: 'Closing Date', sortable: true },
  { key: 'userResponsible', label: 'User Responsible', sortable: true },
  { key: 'value', label: 'Deal Value', sortable: true },
  { key: 'status', label: 'Deal Status', sortable: true },
  { key: 'action', label: 'Actions', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]
const status = ref('All')

const currentPage = ref(1)
const perPage = ref(5)
const totalRows = ref(dealData.length)
const deals = ref<DealType[]>(dealData)

function onFiltered(filteredItems: DealType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

const steps: string[] = ['Strategy Development', 'Target Identification', 'Valuation Analysis', 'Negotiations', 'Deal Closure']
</script>
