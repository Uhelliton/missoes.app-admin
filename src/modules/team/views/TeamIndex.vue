<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="align-items-center">
            <div class="col">
              <BCardTitle>Gerenciar Equipes</BCardTitle>
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto">
                  <b-button type="button" variant="primary" @click="handleCreate">
                    <i class="fa-solid fa-plus me-1"></i> Nova Equipe
                  </b-button>
                </div>
              </form>
            </div>
          </BRow>
        </BCardHeader>
        <BCardBody  class="pt-0">
          <Datatable :items="dataTable.items" :columns="dataTable.columns" :has-actions="true">
            <template #actions="{ item }">
              <button @click="handleEdit(item)" class="btn btn-xs">
                <i class="iconoir-edit-pencil text-secondary fs-18"></i>
              </button>
            </template>
          </Datatable>
        </BCardBody >
      </BCard>
    </BCol>
  </BRow>
  <FormTeam
    :is-open="dialogTeamActive"
    @close="() => (dialogTeamActive = false)"
    :team="dataTable.rowSelected"
    @created="fetchTeams"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import FormTeam from '@/modules/team/components/FormTeam.vue'
import { TeamService } from '@/modules/team/services/team.service'
import type { ITeam } from '@/modules/team/types/team.interface'
import Datatable from "@/components/table/Datatable.vue";

const teamService = TeamService()
const dialogTeamActive = ref(false)
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Nome' },
  ],
  rowSelected: {} as Ref<ITeam>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchTeams()
})

const fetchTeams = async () => {
  try {
    const { data } = await teamService.getAll()

    dataTable.items = data?.items ?? []
    dataTable.total = data?.meta?.totalItems ?? 0
    dataTable.currentPage = data?.meta?.currentPage ?? 1
  } catch (error) {
    console.error('Erro ao buscar equipes:', error)
  }
}

const handleEdit = (row: IMember) => {
  dataTable.rowSelected = row
  dialogTeamActive.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogTeamActive.value = true
}
</script>
