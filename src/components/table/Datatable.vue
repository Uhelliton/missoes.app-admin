<template>
  <div>
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
      <div class="col-sm">
        <div class="d-flex align-items-center gap-2">
          <div class="text-muted text-nowrap">Exibindo <span class="fw-semibold">{{ start + 1 }} de {{ end }} </span>
            <span class="fw-semibold"> de {{ totalItems }}</span> registros
          </div>
          <div class="d-flex align-items-center gap-2">
            <label for="page-size-select">Por Página</label>
            <select name="page-size-select" id="page-size-select" class="form-select w-auto" v-model="perPage">
              <option value="12">12</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-sm">
        <b-pagination
          v-model="page"
          :total-rows="totalItems"
          :per-page="perPage"
          @update:model-value="handlePageClick"
          class="justify-content-end mt-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, watch } from 'vue'

interface Column {
  key: string
  label: string
}

interface Props {
  items: any[]
  columns: Column[]
  hasActions?: boolean
  totalItems: number
  page: number,
  perPage: number,
  search: string
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  perPage: 12,
  search: ''
})

interface Emits {
  (event: 'page-click', value: object): void,
  (event: 'update:perPage', value: object): void
}

const emit = defineEmits<Emits>()

const page = ref(props.page)
const perPage = ref(props.perPage)

watch(perPage, (val) => {
  emit('update:perPage', { page: page.value, limit: val })
})

const filteredItems = computed(() =>
  props.items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(props.search.toLowerCase())
    )
  )
)

const start = computed(() => (props.page - 1) * perPage.value)
const end = computed(() => Math.min(start.value + perPage.value, filteredItems.value.length))

const paginatedItems = computed(() =>
  filteredItems.value.slice(start.value, end.value)
)

const handlePageClick = (page: any) => {
  emit('page-click', { page: page, limit: perPage.value })
}
</script>
