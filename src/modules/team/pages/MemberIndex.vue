<template>
  <BRow>
    <Preloader :loading="isLoading"></Preloader>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            <BCardTitle class="mb-0">Gerenciar Membros</BCardTitle>

            <div class="app-search">
              <BFormInput v-model="filter.search" type="text" placeholder="Buscar por nome ou cpf..." @input="handleSearch" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton variant="primary" @click="handleCreate"> <Icon icon="plus" class="me-1" /> Novo Membro </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <BDropdown variant="light" menu-class="dropdown-menu-end">
              <template #button-content>
                Exportar Dados
                <Icon icon="chevron-down" class="ms-1" />
              </template>
              <BDropdownItem @click="exportToPDF">
                <Icon icon="file-text" class="me-1" /> PDF
              </BDropdownItem>
              <BDropdownItem @click="exportToExcel">
                <Icon icon="file-text" class="me-1" /> Excel
              </BDropdownItem>
            </BDropdown>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          hover
          responsive
          empty-text="Nenhum membro encontrado."
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

          <template #cell(gender)="{ item }">
            <BBadge
              :variant="null"
              :class="[
                { 'bg-transparent border border-primary text-primary': item.gender === 'Masculino' },
                { 'bg-transparent border border-danger text-danger': item.gender === 'Feminino' },
              ]"
            >
              {{ item.gender }}
            </BBadge>
          </template>

          <template #cell(category)="{ item }">
            <BBadge :variant="null" pill :class="[getClassBadgeAgeCategory(item.birthday)]">{{ getAgeCategory(item.birthday) }}</BBadge>
          </template>

          <template #cell(city)="{ item }">{{ item.city?.name }}</template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm" title="Editar Membro" @click="handleEdit(item)">
                <Icon icon="edit" class="fs-lg" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination :currentPage="currentPage" :per-page="perPage" :total-items="dataTable.total" label="membros" @update:currentPage="onPageChange" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <FormMember :is-open="dialogMember" @close="() => (dialogMember = false)" :member="dataTable.rowSelected" @created="fetchMembers()" />
</template>

<script setup lang="ts">
import { BBadge, BButton, BCard, BCardFooter, BCardHeader, BCardTitle, BCol, BDropdown, BDropdownItem, BFormInput, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { onMounted, reactive, ref, watch } from 'vue'
import FormMember from '@/modules/team/components/FormMember.vue'
import { MemberService } from '@/modules/team/services/member.service'
import type { IMember } from '@/modules/team/types/member.interface'
import { getAgeCategory, getClassBadgeAgeCategory } from '@/infra/utils/helper'
import { usePdfExport, useExcelExport } from '@/infra/composables'
import Preloader from '@/components/Preloader.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'

const { createPDF } = usePdfExport()
const { createExcel } = useExcelExport()
const memberService = MemberService()

const dialogMember = ref(false)
const filter = reactive({ search: '' })
const isLoading = ref(false)

// Pagination state (server-side)
const currentPage = ref(1)
const perPage = ref(12)
const perPageOptions = [12, 20, 50]

const dataTable = reactive({
  items: [] as IMember[],
  rowSelected: null as IMember | null,
  total: 0,
})

// Table fields
const fields = [
  { key: 'id', label: 'Cód', sortable: false },
  { key: 'name', label: 'Nome', sortable: false },
  { key: 'email', label: 'Email', sortable: false },
  { key: 'cpf', label: 'CPF', sortable: false },
  { key: 'gender', label: 'Sexo', sortable: false },
  { key: 'category', label: 'Classificação', sortable: false },
  { key: 'city', label: 'Cidade', sortable: false },
  { key: 'action', label: 'Ações', sortable: false },
]

onMounted(async () => {
  await fetchMembers()
})

const fetchMembers = async (query: object = {}) => {
  const querystring = {
    page: currentPage.value,
    limit: perPage.value,
    ...(filter.search && filter.search.length >= 3 ? { search: filter.search } : {}),
    ...query,
  }
  const response = await memberService.getAll(querystring)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  currentPage.value = response.data.meta.currentPage
}

const handleEdit = (row: IMember) => {
  dataTable.rowSelected = row
  dialogMember.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogMember.value = true
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    currentPage.value = 1
    await fetchMembers({ page: 1 })
  } else if (!filter.search.length) {
    currentPage.value = 1
    await fetchMembers({ page: 1 })
  }
}

// Page changes from TablePagination
const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchMembers({ page })
}

// React to per-page changes
watch(perPage, async () => {
  currentPage.value = 1
  await fetchMembers({ page: 1 })
})

const exportToPDF = async () => {
  isLoading.value = true
  const response = await memberService.getAll({ limit: 500 })
  const columns = ['#', 'Código', 'Nome', 'Cpf', 'Classificação', 'Igreja']
  const body = response.data.items
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((m, i) => [i + 1, m.id, m.name, m.cpf, getAgeCategory(m.birthday), m.church.name])

  createPDF('Relatório de Membros', body, columns)
  isLoading.value = false
}

const exportToExcel = async () => {
  isLoading.value = true
  const response = await memberService.getAll({ limit: 500 })
  const body = response.data.items
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((m) => ({
      Código: m.id,
      Nome: m.name,
      Email: m.email,
      CPF: m.cpf,
      Sexo: m.gender,
      Classification: getAgeCategory(m.birthday),
      Igreja: m.church.name,
      Cidade: m.city.name,
    }))

  createExcel('Relatório de Membros', body)
  isLoading.value = false
}
</script>
