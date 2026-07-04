<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <BCardTitle class="card-title">Top Performing</BCardTitle>

      <div class="d-flex align-items-center gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Search..." />
          <Icon icon="search" class="app-search-icon text-muted" />
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
      :items="saleExecutives"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      responsive
      class="table table-custom table-nowrap table-centered mb-0 w-100"
    >
      <template #cell(user)="{ item }">
        <h5 class="fs-14 mb-0 fw-normal">{{ item.user.name }}</h5>
        <span class="text-muted fs-12">{{ item.user.designation }}</span>
      </template>
      <template #head(action)> ••• </template>
      <template #cell(action)>
        <RouterLink to="" class="text-muted fs-20"> <Icon icon="eye" /></RouterLink>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="deals" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { saleExecutiveData, type SaleExecutiveType } from './data.ts'

const fields: Exclude<TableFieldRaw<SaleExecutiveType>, string>[] = [
  { key: 'user', label: 'User', sortable: false },
  { key: 'leads', label: 'Leads', sortable: true },
  { key: 'deals', label: 'Deals', sortable: false },
  { key: 'tasks', label: 'Tasks', sortable: true },

  { key: 'action', label: 'Actions', sortable: false },
]

const searchQuery = ref('')

const currentPage = ref(1)
const perPage = ref(5)
const totalRows = ref(saleExecutiveData.length)
const saleExecutives = ref<SaleExecutiveType[]>(saleExecutiveData)

function onFiltered(filteredItems: SaleExecutiveType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}
</script>
