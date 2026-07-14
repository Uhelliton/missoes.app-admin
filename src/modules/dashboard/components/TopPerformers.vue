<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <BCardTitle class="card-title">Desempenho por Equipe</BCardTitle>

      <div class="d-flex align-items-center gap-2">
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Buscar..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
        <div>
          <BFormSelect
            v-model="year"
            class="form-control"
            placeholder="Selecione uma opção"
            @change="handleChangeYear($event)"
          >
            <option
              v-for="y in [2025, 2026]"
              :key="y"
              :value="y"
            >
              {{ y }}
            </option>
          </BFormSelect>
        </div>
      </div>
    </BCardHeader>

    <BTable
      show-empty
      :filter="searchQuery"
      empty-text="Nenhum resultado encontrado."
      thead-class="bg-light align-middle bg-opacity-25 thead-sm"
      hover
      :fields="fields"
      :items="teams"
      :per-page="perPage"
      :current-page="currentPage"
      @filtered="onFiltered"
      responsive
      class="table table-custom table-nowrap table-centered mb-0 w-100"
    >
      <template #cell(team)="{ item }">
        <div class="d-flex align-items-center">
          <span class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-1">
            {{ item.prefix }}
          </span>
          <h5 class="fs-14 mb-0 fw-normal">{{ item.team }}</h5>
        </div>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="equipes" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref, onMounted } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { BiEvangelismService } from '../services/bi-evangelism.service'
import type { ISummaryEvangelismTeam } from '../types/bi-evangelism.interface'

const biEvangelismService = BiEvangelismService()

const fields: Exclude<TableFieldRaw<ISummaryEvangelismTeam>, string>[] = [
  { key: 'team', label: 'Equipe', sortable: false },
  { key: 'total', label: 'Evangelizados', sortable: true },
  { key: 'courses', label: 'Cursos', sortable: true },
  { key: 'cells', label: 'Células', sortable: true },
  { key: 'decision', label: 'Conversões', sortable: true },
]

const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(12)
const totalRows = ref(0)
const teams = ref<ISummaryEvangelismTeam[]>([])
const year = ref(new Date().getFullYear())


function onFiltered(filteredItems: ISummaryEvangelismTeam[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

const handleChangeYear = (event: any) => {
  year.value = event.target.value
  fetchData()
}

const fetchData = async () => {
  const response = await biEvangelismService.getSumEvangelismByTeams({ year: year.value })
  teams.value = response.data ?? []
  totalRows.value = teams.value.length
}

onMounted(async () => {
  await fetchData()
})
</script>
