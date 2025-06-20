<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="d-flex align-content-center align-items-center">
            <div class="col">
              <BCardTitle>Gerenciar Fichas de Evangelismo</BCardTitle>
            </div>
            <div class="col-3">
              <b-form-input v-model="filter.search" @input="handleSearch" placeholder="buscar por nome..." />
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto -mt-5">
                  <b-button type="button" variant="primary" @click="handleCreate">
                    <i class="fa-solid fa-plus me-1"></i> Nova Ficha
                  </b-button>
                </div>
              </form>
            </div>
          </BRow>
        </BCardHeader>
        <BCardBody class="pt-0">
          <Datatable
            :items="dataTable.items"
            :columns="dataTable.columns"
            :total-items="dataTable.total"
            @page-click="onChangePage"
            :has-actions="true"
          >
            <template #actions="{ item }">
              <button @click="handleEdit(item)" class="btn btn-sm btn-outline-light mx-2" title="Editar Ficha">
                <span class="d-flex justify-content-center align-items-center">
                  <i class="iconoir-edit-pencil text-secondary fs-16"></i>
                </span>
              </button>
            </template>
            <template #cell-gender="{ item }">
              <BBadge
                :variant="null"
                :class="[
                  { 'bg-transparent border  border-primary text-primary': item.gender === 'Masculino' },
                  { 'bg-transparent border  border-danger text-danger': item.gender === 'Feminino' },
                ]"
              >
                {{ item.gender }}
              </BBadge>
            </template>
            <template #cell-acceptedCourse="{ item }">
               {{ item.acceptedCourse ? 'Sim' : 'Não' }}
            </template>
            <template #cell-acceptedCell="{ item }">
              {{ item.acceptedCell ? 'Sim' : 'Não' }}
            </template>
            <template #cell-madeDecision="{ item }">
              {{ item.madeDecision ? 'Sim' : 'Não' }}
            </template>
            <template #cell-age="{ item }">
              <b-badge :variant="null" pill :class="[getClassBadgeAgeCategory(item.age)]">
                {{ getAgeCategory(item.age) }}
              </b-badge>
            </template>
            <template #cell-members="{ item }">
              {{ item.members.map(({ name }) => name ).join(', ') }}
            </template>
          </Datatable>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
  <FormFactsheet  :is-open="dialogFactsheetIsActive" />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import { EvangelismRecordService } from '@/modules/evangelism/services/evangelism-record.service'
import Datatable from '@/components/table/Datatable.vue'
import { getAgeCategory, getClassBadgeAgeCategory} from '@/infra/helpers/helper'
import type {IEvangelismRecord} from "@/modules/evangelism/types/evangelism-record.interface";
import FormFactsheet from "@/modules/evangelism/components/FormFactsheet.vue";

const evangelismRecordService = EvangelismRecordService()
const dialogFactsheetIsActive = ref(false)
const filter = reactive({ search: '' })
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'code', label: 'Cod' },
    { key: 'name', label: 'Nome' },
    { key: 'acceptedCourse', label: 'Aceitou Curso' },
    { key: 'acceptedCell', label: 'Aceitou Célula' },
    { key: 'madeDecision', label: 'Tomou Decisão' },
    { key: 'age', label: 'Classificação' },
    { key: 'members', label: 'Evangelistas' },
  ],
  rowSelected: {} as Ref<IEvangelismRecord>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchRecords()
})

const fetchRecords = async (query: object = {}) => {
  const response = await evangelismRecordService.getAll(query)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  dataTable.currentPage = response.data.meta.currentPage
}

const handleEdit = (row: IEvangelismRecord) => {
  dataTable.rowSelected = row
  dialogFactsheetIsActive.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogFactsheetIsActive.value = true
}

const onChangePage = async (page: number) => {
  await fetchRecords({ page: page })
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    await fetchRecords({ page: 1, search: filter.search })
  } else if (!filter.search.length) {
    await fetchRecords({ page: 1 })
  }
}
</script>
