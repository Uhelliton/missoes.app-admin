<template>
  <PageBreadcrumb title="Gerenciar Igrejas" subtitle="Projeto" />
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            <BButton variant="primary" @click="handleCreate"> <Icon icon="plus" class="me-1" /> Nova Igreja </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          hover
          responsive
          empty-text="Nenhuma igreja encontrada."
          :items="dataTable.items"
          :fields="fields"
          thead-class="bg-light bg-opacity-25 thead-sm"
          class="table table-custom table-centered mb-0 w-100"
        >
          <template #head()="item">
            <span class="text-uppercase fs-xxs">{{ item.label }}</span>
          </template>

          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Ações</span>
          </template>

          <template #cell(city)="{ item }">{{ item.city?.name }}</template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm" title="Editar Igreja" @click="handleEdit(item)">
                <Icon icon="edit" class="fs-lg" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination :currentPage="currentPage" :per-page="perPage" :total-items="dataTable.total" label="igrejas" @update:currentPage="onPageChange" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <FormChurch :is-open="dialogMember" @close="() => (dialogMember = false)" :church="dataTable.rowSelected" @created="fetchChurches()" />
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCardTitle, BCol, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { onMounted, reactive, ref, watch } from 'vue'
import FormChurch from '@/modules/project/components/FormChurch.vue'
import { ChurchService } from '@/modules/project/services/church.service'
import type { IChurch } from '@/modules/project/types/church.interface'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'

const churchService = ChurchService()

const dialogMember = ref(false)

// Pagination state (server-side)
const currentPage = ref(1)
const perPage = ref(12)
const perPageOptions = [12, 20, 50]

const dataTable = reactive({
  items: [] as IChurch[],
  rowSelected: null as IChurch | null,
  total: 0,
})

// Table fields
const fields = [
  { key: 'id', label: '#', sortable: false },
  { key: 'name', label: 'Nome', sortable: false },
  { key: 'email', label: 'Email', sortable: false },
  { key: 'cnpj', label: 'CNPJ', sortable: false },
  { key: 'city', label: 'Cidade', sortable: false },
  { key: 'action', label: 'Ações', sortable: false },
]

onMounted(async () => {
  await fetchChurches()
})

const fetchChurches = async (query: object = {}) => {
  const querystring = { page: currentPage.value, limit: perPage.value, ...query }
  const response = await churchService.getAll(querystring)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  currentPage.value = response.data.meta.currentPage
}

const handleEdit = (row: IChurch) => {
  dataTable.rowSelected = row
  dialogMember.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogMember.value = true
}

// Page changes from TablePagination
const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchChurches({ page })
}

// React to per-page changes
watch(perPage, async () => {
  currentPage.value = 1
  await fetchChurches({ page: 1 })
})
</script>
