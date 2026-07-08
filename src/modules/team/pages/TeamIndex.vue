<template>
  <PageBreadcrumb title="Gerenciar Equipes" subtitle="Equipes" />
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            <BButton variant="primary" @click="handleCreate"> <Icon icon="plus" class="me-1" /> Nova Equipe </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <BDropdown variant="light" menu-class="dropdown-menu-end">
              <template #button-content>
                Exportar Dados
                <Icon icon="chevron-down" class="ms-1" />
              </template>
              <BDropdownItem @click="exportToPDF">
                <Icon icon="file-text" class="me-1" />
                Relatório por Equipe
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
          empty-text="Nenhuma equipe encontrada."
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
            <div class="d-flex align-items-center">
              <span class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-1">
                {{ getPrefixName(item.name) }}
              </span>
              {{ item.name }}
            </div>
          </template>

          <template #cell(leader)="{ item }">{{ item.leader?.name }}</template>

          <template #cell(members)="{ item }">
            <div class="avatar-group avatar-group-xs">
              <template v-for="member in item.members" :key="member.id">
                <div class="avatar-sm me-n2">
                  <div class="avatar-title text-bg-secondary fw-bold rounded-circle" v-b-tooltip.hover.top="`${member.name}`">
                    {{ member.name[0] }}
                  </div>
                </div>
              </template>
            </div>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm" title="Editar Equipe" @click="handleEdit(item)">
                <Icon icon="edit" class="fs-lg" />
              </button>
              <button class="btn btn-warning btn-sm" title="Associar Membros" @click="associateMember(item)">
                <Icon icon="user" class="fs-lg me-1" /> Associar Membros
              </button>
              <button class="btn btn-default btn-icon btn-sm" title="Estatísticas da Equipe" @click="redirectToTeamAnalytics(item.id)">
                <Icon icon="chart-bar" class="fs-lg" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination :currentPage="currentPage" :per-page="perPage" :total-items="dataTable.total" label="equipes" @update:currentPage="onPageChange" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <FormTeam :is-open="dialogTeamActive" @close="() => (dialogTeamActive = false)" :team="dataTable.rowSelected" @created="fetchTeams()" />
  <DualListbox
    :is-open="dialogTeamMemberActive"
    :team-members="dataTable.rowSelected?.members"
    :team="dataTable.rowSelected"
    @close="() => (dialogTeamMemberActive = false)"
    @update:list="fetchTeams()"
  />
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCardTitle, BCol, BDropdown, BDropdownItem, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormTeam from '@/modules/team/components/FormTeam.vue'
import DualListbox from '@/modules/team/components/DualListbox.vue'
import { TeamService } from '@/modules/team/services/team.service'
import type { ITeam } from '@/modules/team/types/team.interface'
import { useTeamExportData } from '@/modules/team/composables/useTeamExportData'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'

const teamService = TeamService()
const router = useRouter()

const dialogTeamActive = ref(false)
const dialogTeamMemberActive = ref(false)

// Pagination state (server-side)
const currentPage = ref(1)
const perPage = ref(12)
const perPageOptions = [12, 20, 50]

const dataTable = reactive({
  items: [] as ITeam[],
  rowSelected: null as ITeam | null,
  total: 0,
})

// Table fields
const fields = [
  { key: 'id', label: '#', sortable: false },
  { key: 'name', label: 'Nome', sortable: false },
  { key: 'color', label: 'Cor', sortable: false },
  { key: 'leader', label: 'Lider', sortable: false },
  { key: 'members', label: 'Membros', sortable: false },
  { key: 'action', label: 'Ações', sortable: false },
]

onMounted(async () => {
  await fetchTeams()
})

const getPrefixName = (name: string) => {
  const split = name.replace(/\s+/g, ' ').split(' ')
  const strPart = String(split[1] || '').toUpperCase()
  return strPart[0] + strPart[1]
}

const fetchTeams = async (query: object = {}) => {
  try {
    const querystring = { page: currentPage.value, limit: perPage.value, ...query }
    const { data } = await teamService.getAll(querystring)
    dataTable.items = data?.items ?? []
    dataTable.total = data?.meta?.totalItems ?? 0
    currentPage.value = data?.meta?.currentPage ?? 1
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

const redirectToTeamAnalytics = (id: number) => {
  router.push({ name: 'team.analytics', params: { id: id.toString() } })
}

// Page changes from TablePagination
const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchTeams({ page })
}

// React to per-page changes
watch(perPage, async () => {
  currentPage.value = 1
  await fetchTeams({ page: 1 })
})

const exportToPDF = async () => {
  const { data } = await teamService.getAll({ limit: 500 })
  const { exportToPDF } = useTeamExportData(data?.items ?? [])
  exportToPDF()
}
</script>
