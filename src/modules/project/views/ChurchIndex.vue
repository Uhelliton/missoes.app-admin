<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="align-items-center">
            <div class="col">
              <BCardTitle>Gerenciar Igrejas</BCardTitle>
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto">
                  <b-button type="button" variant="primary" @click="handleCreate">
                    <i class="fa-solid fa-plus me-1"></i> Nova Igreja
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
            :has-actions="true">
            <template #actions="{ item }">
              <button @click="handleEdit(item)" class="btn btn-sm btn-outline-light mx-2" title="Editar Membro">
                <span class="d-flex justify-content-center align-items-center">
                  <i class="iconoir-edit-pencil text-secondary fs-16"></i>
                </span>
              </button>
            </template>
            <template #cell-city="{ item }">
              {{ item.city.name }}
            </template>
          </Datatable>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
  <FormChurch
    :is-open="dialogMember"
    @close="() => (dialogMember = false)"
    :church="dataTable.rowSelected"
    @created="fetchChurches()"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import FormChurch from '@/modules/project/components/FormChurch.vue'
import { ChurchService } from '@/modules/project/services/church.service'
import type { IChurch } from '@/modules/project/types/church.interface'
import Datatable from '@/components/table/Datatable.vue'

const churchService = ChurchService()
const dialogMember = ref(false)
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'city', label: 'Cidade' },
  ],
  rowSelected: {} as Ref<IChurch>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchChurches()
})

const fetchChurches = async (query: object = {}) => {
  const response = await churchService.getAll(query)
  dataTable.items = response.data.items
  dataTable.total = response.data.meta.totalItems
  dataTable.currentPage = response.data.meta.currentPage
}

const handleEdit = (row: IChurch) => {
  dataTable.rowSelected = row
  dialogMember.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogMember.value = true
}

const onChangePage = async (paginate: object) => {
  await fetchChurches({ ...paginate })
}
</script>
