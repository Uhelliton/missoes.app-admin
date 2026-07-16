<template>
  <BCard no-body>
    <BCardHeader class="border-light justify-content-between">
      <BCardTitle class="card-title">Equipe xxx</BCardTitle>

      <div class="d-flex align-items-center gap-2">
        <BButton variant="light" :disabled="!teams.length" @click="exportToPDF">
          <Icon icon="file-text" class="me-1" /> Imprimir Relatório
        </BButton>
        <div class="app-search">
          <BFormInput v-model="searchQuery" type="search" placeholder="Buscar..." />
          <Icon icon="search" class="app-search-icon text-muted" />
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
      foot-clone
      class="table table-custom table-nowrap table-centered mb-0 w-100"
    >
      <template #cell(date)="{ item }">{{ formatDateToPtBr(item.date) }}</template>
      <template #foot(date)>
        <span class="fw-semibold">Total</span>
      </template>
      <template #foot(total)>
        <span class="fw-semibold">{{ totals.total }}</span>
      </template>
      <template #foot(courses)>
        <span class="fw-semibold">{{ totals.courses }}</span>
      </template>
      <template #foot(cells)>
        <span class="fw-semibold">{{ totals.cells }}</span>
      </template>
      <template #foot(decision)>
        <span class="fw-semibold">{{ totals.decision }}</span>
      </template>
    </BTable>

    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="equipes" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import type { TableFieldRaw } from 'bootstrap-vue-next'
import { ref, computed, onMounted } from 'vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { BiEvangelismService } from '~/modules/dashboard/services/bi-evangelism.service'
import type { ISummaryEvangelismDaily } from '~/modules/dashboard/types/bi-evangelism.interface'
import { useTeamPerformersExportData } from '@/modules/team/composables/useTeamPerformersExportData'
import { formatDateToPtBr } from '~/infra/utils/helper.ts'

const biEvangelismService = BiEvangelismService()

const fields: Exclude<TableFieldRaw<ISummaryEvangelismDaily>, string>[] = [
  { key: 'date', label: 'Data', sortable: false },
  { key: 'total', label: 'Evangelizados', sortable: true },
  { key: 'courses', label: 'Cursos', sortable: true },
  { key: 'cells', label: 'Células', sortable: true },
  { key: 'decision', label: 'Conversões', sortable: true },
]

const searchQuery = ref('')
const currentPage = ref(1)
const perPage = ref(12)
const totalRows = ref(0)
const teams = ref<ISummaryEvangelismDaily[]>([])
const year = ref(new Date().getFullYear())

const totals = computed(() => {
  return teams.value.reduce(
    (acc, item) => {
      acc.total += Number(item.total) || 0
      acc.courses += Number(item.courses) || 0
      acc.cells += Number(item.cells) || 0
      acc.decision += Number(item.decision) || 0
      return acc
    },
    { total: 0, courses: 0, cells: 0, decision: 0 },
  )
})


function onFiltered(filteredItems: ISummaryEvangelismDaily[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}

const handleChangeYear = (event: any) => {
  year.value = event.target.value
  fetchData()
}

const fetchData = async () => {
  const response = await biEvangelismService.getSummaryEvangelismDaily({ year: year.value, teamId: 14 })
  teams.value = response.data ?? []
  totalRows.value = teams.value.length
}

const exportToPDF = () => {
  const { exportToPDF: generatePDF } = useTeamPerformersExportData(teams.value, Number(year.value))
  generatePDF()
}

onMounted(async () => {
  await fetchData()
})
</script>
