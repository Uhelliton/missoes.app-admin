<template>
  <BRow>
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

const memberService = MemberService()
const dialogMember = ref(false)
const filter = reactive({ search: '' })
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'id', label: '#' },
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

const onChangePage = async (page: number) => {
  await fetchMembers({ page: page })
}

const handleSearch = async () => {
  if (filter.search && filter.search.length >= 3) {
    await fetchMembers({ page: 1, search: filter.search })
  } else if (!filter.search.length) {
    await fetchMembers({ page: 1 })
  }
}
</script>
