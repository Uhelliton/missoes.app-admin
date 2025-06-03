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
        <BCardBody class="pt-0">
          <Datatable :items="dataTable.items" :columns="dataTable.columns" :has-actions="true">
            <template #actions="{ item }">
              <button @click="handleEdit(item)" class="btn btn-sm btn-outline-light mx-2" title="Editar Equipe">
                <span class="d-flex justify-content-center align-items-center">
                  <i class="iconoir-edit-pencil text-secondary fs-16"></i>
                </span>
              </button>
              <button @click="associateMember(item)" class="btn btn-sm btn-warning">
                <span class="d-flex justify-content-center align-items-center gap-1">
                  <i class="iconoir-user text-white fs-16"></i> Associar Membros
                </span>
              </button>
            </template>
            <template #cell-leader="{ item }">
              {{ item.leader.name }}
            </template>
            <template #cell-name="{ item }">
              <div class="d-flex align-items-center">
                <span
                  class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-1"
                >
                  {{ getPrefixName(item.name) }}
                </span>
                {{ item.name }}
              </div>
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
          </Datatable>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
  <FormTeam
    :is-open="dialogTeamActive"
    @close="() => (dialogTeamActive = false)"
    :team="dataTable.rowSelected"
    @created="fetchTeams"
  />
  <DualListbox
    :is-open="dialogTeamMemberActive"
    :team-members="dataTable.rowSelected.members"
    :team="dataTable.rowSelected"
    @close="() => (dialogTeamMemberActive = false)"
    @update:list="fetchTeams"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from 'vue'
import FormTeam from '@/modules/team/components/FormTeam.vue'
import { TeamService } from '@/modules/team/services/team.service'
import type { ITeam } from '@/modules/team/types/team.interface'
import Datatable from '@/components/table/Datatable.vue'
import DualListbox from '@/modules/team/components/DualListbox.vue'

const teamService = TeamService()
const dialogTeamActive = ref(false)
const dialogTeamMemberActive = ref(false)
const dataTable = reactive({
  items: [],
  columns: [
    { key: 'id', label: '#' },
    { key: 'name', label: 'Nome' },
    { key: 'color', label: 'Cor' },
    { key: 'leader', label: 'Lider' },
    { key: 'members', label: 'Membros' },
  ],
  rowSelected: {} as Ref<ITeam>,
  currentPage: 1,
  total: 0,
})

onMounted(async () => {
  await fetchTeams()
})

const getPrefixName = (name: string) => {
  const split = name.split(' ')
  const strPart = String(split[1] || '').toUpperCase()
  return strPart[0] + strPart[1]
}

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

const handleEdit = (row: ITeam) => {
  dataTable.rowSelected = row
  dialogTeamActive.value = true
}

const handleCreate = () => {
  dataTable.rowSelected = null
  dialogTeamActive.value = true
}

const associateMember = (row: ITeam) => {
  dataTable.rowSelected = row
  dialogTeamMemberActive.value = true
}
</script>
