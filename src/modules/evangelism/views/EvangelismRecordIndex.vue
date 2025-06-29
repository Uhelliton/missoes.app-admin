<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="d-flex align-content-center align-items-center">
            <div class="col">
              <BCardTitle>Gerenciar Fichas de Evangelismo</BCardTitle>
            </div>
            <div class="col-2">
              <BFormGroup label="Ordenar por" label-for="sort" class="mb-3">
                <BFormSelect
                  v-model="filter.sort"
                  class="form-control"
                  placeholder="Selecione uma opção"
                  @change="handleSortBy"
                >
                  <template #first>
                    <option disabled value="">Selecione uma opção</option>
                  </template>
                  <option value="code:desc">Código: Maior > Menor</option>
                  <option value="code:asc">Código: Menor > Maior</option>
                  <option value="name:asc">Nome: A-Z</option>
                </BFormSelect>
              </BFormGroup>
            </div>
            <div class="col-2">
              <b-form-input v-model="filter.search" @input="handleSearch" placeholder="buscar por nome ou código.." />
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
            @update:perPage="onChangePage"
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
            <template #cell-name="{ item }">
              {{ item.name }}
              <span v-if="item.additionalPeople.length" class="badge rounded text-white bg-secondary ms-1">
                + {{ item.additionalPeople.length }}
              </span>
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
              <b-badge :variant="null" pill :class="[ageCategoryClasses[item.ageCategory]]">
                {{ item.ageCategory }}
              </b-badge>
            </template>
            <template #cell-members="{ item }">
              <div class="img-group">
                <template v-for="member in item.members" :key="member.id">
                  <a
                    class="user-avatar position-relative d-inline-block"
                    href="javascript:"
                    :title="member.name"
                    :class="member.id && 'ms-n2'"
                  >
                    <span class="thumb-md bg-secondary text-white rounded-circle me-0">
                      {{ member.name[0] }}
                    </span>
                  </a>
                </template>
              </div>
            </template>
            <template #cell-team="{ item }">
              {{ item.team.name }}
            </template>
            <template #cell-evangelizedAt="{ item }">
              {{ formatDateToPtBr(item.evangelizedAt) }}
            </template>
            <template #cell-notes="{ item }">
              <span class="d-flex justify-content-end align-items-end" v-if="item.notes">
                <i class="iconoir-message-text  text-secondary fs-20" v-b-tooltip.hover.top="`${ item.notes }`"></i>
              </span>
            </template>
          </Datatable>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
  <FormFactsheet
    :is-open="dialogFactsheetIsActive"
    @close="() => (dialogFactsheetIsActive = false)"
    :evangelismRecord="dataTable.rowSelected"
    @created="fetchRecords()"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import { useAuthStore } from '@/modules/auth/stores/auth'
import { EvangelismRecordService } from '@/modules/evangelism/services/evangelism-record.service'
import Datatable from '@/components/table/Datatable.vue'
import { ageCategoryClasses, formatDateToPtBr } from '@/infra/helpers/helper'
import type { IEvangelismRecord } from '@/modules/evangelism/types/evangelism-record.interface'
import FormFactsheet from '@/modules/evangelism/components/FormFactsheet.vue'

const evangelismRecordService = EvangelismRecordService()
const { isTenancyTeam,  userAuth } = useAuthStore()

const dialogFactsheetIsActive = ref(false)
const filter = reactive({ search: '', sort: 'id:desc' })
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'code', label: 'Cod' },
    { key: 'name', label: 'Nome' },
    { key: 'team', label: 'Equipe' },
    { key: 'acceptedCourse', label: 'Curso' },
    { key: 'acceptedCell', label: 'Célula' },
    { key: 'madeDecision', label: 'Tomou Decisão' },
    { key: 'age', label: 'Classificação' },
    { key: 'members', label: 'Evangelistas' },
    { key: 'evangelizedAt', label: 'Data Evangelismo' },
    { key: 'notes', label: '' },
  ],
  rowSelected: {} as Ref<IEvangelismRecord>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchRecords()
})

const fetchRecords = async (query: object = {}) => {
  const queryTeams =  isTenancyTeam ? { team: userAuth.team.name } : null
  const querystring = {
    ...query,
    ...queryTeams
  }
  const response = await evangelismRecordService.getAll(querystring)
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

const onChangePage = async (paginate: object) => {
  await fetchRecords({ ...paginate, sort: filter.sort })
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    await fetchRecords({ page: 1, search: filter.search, sort: filter.sort  })
  } else if (!filter.search.length) {
    await fetchRecords({ page: 1, sort: filter.sort  })
  }
}

const handleSortBy = async () => {
  await fetchRecords({ page: 1, sort: filter.sort })
}
</script>
