<template>
  <b-col lg="5  ">
    <b-card no-body class="card-h-100">
      <b-card-header>
        <b-row class="align-items-center">
          <b-col>
            <b-card-title>Estatísticas por Equipes</b-card-title>
          </b-col>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <b-table-simple responsive class="mb-0">
          <b-thead class="table-light">
            <b-tr>
              <b-th class="border-top-0">Equipe</b-th>
              <b-th class="border-top-0">Evangelizados</b-th>
              <b-th class="border-top-0">Cursos</b-th>
              <b-th class="border-top-0">Células</b-th>
              <b-th class="border-top-0">Conversões</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(item, idx) in summaryData" :key="idx">
              <b-td>
                <div class="d-flex align-items-center">
                  <span
                    class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-1"
                  >
                    {{ getPrefixName(item.team) }}
                  </span>
                  {{ item.team }}
                </div>
              </b-td>
              <b-td>{{ item.total }}</b-td>
              <b-td>{{ item.courses }}</b-td>
              <b-td>{{ item.cells }}</b-td>
              <b-td>{{ item.decision }}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { BiEvangelismService } from '@/modules/dashboard/services/bi-evangelism.service'
import type { ISummaryEvangelismTeam } from '@/modules/dashboard/types/bi-evangelism.interface'

const biEvangelismService = BiEvangelismService()
const summaryData = ref<ISummaryEvangelismTeam[]>([])

onMounted(async () => {
  await fetchData()
})

const totalSumRecord = computed(() => {
  return summaryData.value.reduce((sum, item) => sum + parseInt(item.total), 0)
})

const getPrefixName = (name: string) => {
  const split = name.replace(/\s+/g, ' ').split(' ')
  const strPart = String(split[1] || '').toUpperCase()
  return strPart[0] + strPart[1]
}

const fetchData = async () => {
  const response = await biEvangelismService.getSumEvangelismByTeams()
  summaryData.value = response.data
}
</script>
