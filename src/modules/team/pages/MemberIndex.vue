<template>
  <BRow>
    <Preloader :loading="isLoading"></Preloader>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="d-flex align-content-center align-items-center">
            <div class="col">
              <BCardTitle>Gerenciar Membros</BCardTitle>
            </div>
            <div class="col-3">
              <b-form-input v-model="filter.search" @input="handleSearch" placeholder="buscar por nome ou cpf..." />
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto">
                  <b-dropdown variant="light" menu-class="dropdown-menu-end">
                    <template #button-content>
                      Exportar Dados
                      <i class="las la-angle-down ms-1"></i>
                    </template>
                    <b-dropdown-item @click="exportToPDF">
                      <i class="las la-file-pdf fs-5 me-1"></i>
                      PDF
                    </b-dropdown-item>
                    <b-dropdown-item @click="exportToExcel">
                      <i class="las la-file-excel fs-5 me-1"></i> Excel
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
                <div class="col-auto -mt-5">
                  <b-button type="button" variant="primary" @click="handleCreate">
                    <i class="fa-solid fa-plus me-1"></i> Novo Membro
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
              <button @click="handleEdit(item)" class="btn btn-sm btn-outline-light mx-2" title="Editar Membro">
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
            <template #cell-city="{ item }">
              {{ item.city.name }}
            </template>
            <template #cell-category="{ item }">
              <b-badge :variant="null" pill :class="[getClassBadgeAgeCategory(item.birthday)]"
                >{{ getAgeCategory(item.birthday) }}
              </b-badge>
            </template>
          </Datatable>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
  <FormMember
    :is-open="dialogMember"
    @close="() => (dialogMember = false)"
    :member="dataTable.rowSelected"
    @created="fetchMembers()"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import FormMember from '@/modules/team/components/FormMember.vue'
import { MemberService } from '@/modules/team/services/member.service'
import type { IMember } from '@/modules/team/types/member.interface'
import Datatable from '@/components/table/Datatable.vue'
import { getAgeCategory, getClassBadgeAgeCategory } from '@/infra/helpers/helper'
import { usePdfExport, useExcelExport } from '@/infra/composables'
import Preloader from "@/components/Preloader.vue";

const { createPDF } = usePdfExport()
const { createExcel } = useExcelExport()
const memberService = MemberService()
const dialogMember = ref(false)
const filter = reactive({ search: '' })
const isLoading = ref(false)
const dataTable = reactive({
  preload: false,
  items: [],
  columns: [
    { key: 'id', label: 'Cód' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'cpf', label: 'CPF' },
    { key: 'gender', label: 'Sexo' },
    { key: 'category', label: 'Classificação' },
    { key: 'city', label: 'Cidade' },
  ],
  rowSelected: {} as Ref<IMember>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchMembers()
})

const fetchMembers = async (query: object = {}) => {
  const response = await memberService.getAll(query)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  dataTable.currentPage = response.data.meta.currentPage
}

const handleEdit = (row: IMember) => {
  dataTable.rowSelected = row
  dialogMember.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogMember.value = true
}

const onChangePage = async (paginate: object) => {
  await fetchMembers({ ...paginate })
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    await fetchMembers({ page: 1, search: filter.search })
  } else if (!filter.search.length) {
    await fetchMembers({ page: 1 })
  }
}

const exportToPDF = async () => {
  isLoading.value = true
  const response = await memberService.getAll({ limit: 500 })
  const columns = ['#', 'Código', 'Nome', 'Cpf', 'Classificação', 'Igreja']
  const body = response.data.items
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((m, i) => [
    i + 1,
    m.id,
    m.name,
    m.cpf,
    getAgeCategory(m.birthday),
    m.church.name,
  ])

  createPDF('Relatório de Membros', body, columns)
  isLoading.value = false
}

const exportToExcel = async () => {
  isLoading.value = true
  const response = await memberService.getAll({ limit: 500 })
  const body = response.data.items
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((m, i) => ({
      'Código':  m.id,
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
