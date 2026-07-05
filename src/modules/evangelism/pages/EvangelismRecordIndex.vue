<template>
  <PageBreadcrumb title="Gerenciar Fichas de Evangelismo" subtitle="evangelismo" />
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            <BCardTitle class="mb-0"></BCardTitle>

            <div class="app-search">
              <BFormInput v-model="filter.search" type="text" placeholder="Buscar por nome ou código..." @input="handleSearch" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton variant="primary" @click="handleCreate"> <Icon icon="plus" class="me-1" /> Nova Ficha </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="me-2 fw-semibold">Ordenar por:</span>

            <div class="app-search">
              <BFormSelect v-model="filter.sort" class="form-control my-1 my-md-0" @change="handleSortBy">
                <option disabled value="">Selecione uma opção</option>
                <option value="code:desc">Código: Maior &gt; Menor</option>
                <option value="code:asc">Código: Menor &gt; Maior</option>
                <option value="name:asc">Nome: A-Z</option>
              </BFormSelect>
              <Icon icon="arrows-sort" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          hover
          responsive
          empty-text="Nenhuma ficha encontrada."
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

          <template #cell(name)="{ item }">
            {{ item.name }}
            <span v-if="item.additionalPeople?.length" class="badge rounded text-white bg-secondary ms-1"> + {{ item.additionalPeople.length }} </span>
          </template>

          <template #cell(team)="{ item }">{{ item.team?.name }}</template>

          <template #cell(acceptedCourse)="{ item }">{{ item.acceptedCourse ? 'Sim' : 'Não' }}</template>
          <template #cell(acceptedCell)="{ item }">{{ item.acceptedCell ? 'Sim' : 'Não' }}</template>
          <template #cell(madeDecision)="{ item }">{{ item.madeDecision ? 'Sim' : 'Não' }}</template>

          <template #cell(age)="{ item }">
            <span class="badge fs-xxs py-1 px-2 fw-semibold" :class="[ageCategoryClasses[item.ageCategory]]">{{ item.ageCategory }}</span>
          </template>

          <template #cell(members)="{ item }">
            <div class="avatar-group avatar-group-xs">
              <template v-for="member in item.members" :key="member.id">
                <div class="avatar-sm me-n2">
                  <div class="avatar-title text-bg-primary fw-bold rounded-circle"  v-b-tooltip.hover.top="`${member.name}`" >
                    {{ member.name[0] }}
                  </div>
                </div>
              </template>
            </div>
          </template>

          <template #cell(evangelizedAt)="{ item }">{{ formatDateToPtBr(item.evangelizedAt) }}</template>

          <template #cell(notes)="{ item }">
            <span class="d-flex justify-content-end align-items-end" v-if="item.notes">
               <Icon icon="message-circle" class="fs-lg"  v-b-tooltip.hover.top="`${item.notes}`" />
            </span>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm" title="Editar Ficha" @click="handleEdit(item)">
                <Icon icon="edit" class="fs-lg" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination :currentPage="currentPage" :per-page="perPage" :total-items="dataTable.total" label="fichas" @update:currentPage="onPageChange" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <FormFactsheet :is-open="dialogFactsheetIsActive" @close="() => (dialogFactsheetIsActive = false)" :evangelismRecord="dataTable.rowSelected" @created="fetchRecords()" />
</template>

<script setup lang="ts">
import { BBadge, BButton, BCard, BCardFooter, BCardHeader, BCardTitle, BCol, BFormInput, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { onMounted, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { EvangelismRecordService } from '@/modules/evangelism/services/evangelism-record.service'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { ageCategoryClasses, formatDateToPtBr } from '@/infra/utils/helper'
import type { IEvangelismRecord } from '@/modules/evangelism/types/evangelism-record.interface'
import FormFactsheet from '@/modules/evangelism/components/FormFactsheet.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'

const evangelismRecordService = EvangelismRecordService()
const { isTenancyTeam, userAuth } = useAuthStore()

const dialogFactsheetIsActive = ref(false)
const filter = reactive({ search: '', sort: 'id:desc' })

// Pagination state (server-side)
const currentPage = ref(1)
const perPage = ref(12)
const perPageOptions = [12, 20, 50]

const dataTable = reactive({
  items: [] as IEvangelismRecord[],
  rowSelected: null as IEvangelismRecord | null,
  total: 0,
})

// Table fields
const fields = [
  { key: 'code', label: 'Cod', sortable: false },
  { key: 'name', label: 'Nome', sortable: false },
  { key: 'team', label: 'Equipe', sortable: false },
  { key: 'acceptedCourse', label: 'Curso', sortable: false },
  { key: 'acceptedCell', label: 'Célula', sortable: false },
  { key: 'madeDecision', label: 'Tomou Decisão', sortable: false },
  { key: 'age', label: 'Classificação', sortable: false },
  { key: 'members', label: 'Evangelistas', sortable: false },
  { key: 'evangelizedAt', label: 'Data Evangelismo', sortable: false },
  { key: 'notes', label: '', sortable: false },
  { key: 'action', label: 'Ações', sortable: false },
]

onMounted(async () => {
  await fetchRecords()
})

const fetchRecords = async (query: object = {}) => {
  const queryTeams = isTenancyTeam ? { team: userAuth.team.name } : null
  const querystring = {
    page: currentPage.value,
    limit: perPage.value,
    sort: filter.sort,
    ...(filter.search && filter.search.length >= 3 ? { search: filter.search } : {}),
    ...query,
    ...queryTeams,
  }
  const response = await evangelismRecordService.getAll(querystring)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  currentPage.value = response.data.meta.currentPage
}

const handleEdit = (row: IEvangelismRecord) => {
  dataTable.rowSelected = row
  dialogFactsheetIsActive.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogFactsheetIsActive.value = true
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    currentPage.value = 1
    await fetchRecords({ page: 1 })
  } else if (!filter.search.length) {
    currentPage.value = 1
    await fetchRecords({ page: 1 })
  }
}

const handleSortBy = async () => {
  currentPage.value = 1
  await fetchRecords({ page: 1 })
}

// Page changes from TablePagination
const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchRecords({ page })
}

// React to per-page changes (only triggered by user select, no feedback loop)
watch(perPage, async () => {
  currentPage.value = 1
  await fetchRecords({ page: 1 })
})
</script>
