<template>
  <div>
<!--    <div class="d-flex justify-between align-items-center mb-2 gap-2">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Buscar..."
      />
      <select v-model="perPage" class="form-select w-auto">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
    </div>-->

    <b-table-simple responsive class="mb-0 checkbox-all text-nowrap">
      <b-thead class="table-light">
        <b-tr>
          <b-th v-for="col in columns" :key="col.key">{{ col.label }}</b-th>
          <b-th v-if="hasActions" class="text-end"><!--Ações--></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in paginatedItems" :key="item.id">
          <b-td v-for="col in columns" :key="col.key">
            <slot :name="'cell-' + col.key" :item="item">
              {{ item[col.key] }}
            </slot>
          </b-td>
          <b-td v-if="hasActions" class="text-end">
            <slot name="actions" :item="item" />
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <div class="d-flex justify-between justify-content-between align-items-center mt-3 px-3" >
      <span>
        Exibindo {{ start + 1 }} - {{ end }} de {{ filteredItems.length }}
      </span>

      <b-pagination
        v-model="page"
        :total-rows="filteredItems.length"
        :per-page="perPage"
        prev-text="Previous"
        next-text="Next"
        class="justify-content-end mt-2"
      />

<!--      <div>-->
<!--        <button-->
<!--          class="btn btn-sm btn-outline-primary me-2"-->
<!--          :disabled="page === 1"-->
<!--          @click="page&#45;&#45;"-->
<!--        >-->
<!--          Anterior-->
<!--        </button>-->
<!--        <button-->
<!--          class="btn btn-sm btn-outline-primary"-->
<!--          :disabled="end >= filteredItems.length"-->
<!--          @click="page++"-->
<!--        >-->
<!--          Próxima-->
<!--        </button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

interface Column {
  key: string
  label: string
}

const props = defineProps<{
  items: any[]
  columns: Column[]
  hasActions?: boolean
}>()

const search = ref('')
const page = ref(1)
const perPage = ref(12)

const filteredItems = computed(() =>
  props.items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  )
)

const start = computed(() => (page.value - 1) * perPage.value)
const end = computed(() =>
  Math.min(start.value + perPage.value, filteredItems.value.length)
)

const paginatedItems = computed(() =>
  filteredItems.value.slice(start.value, end.value)
)
</script>
