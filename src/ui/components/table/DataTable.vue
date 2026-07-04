<script setup lang="ts" generic="T extends Record<string, unknown>">
import { BCard, BCardHeader, BCardFooter, BTable } from 'bootstrap-vue-next';
import type { TableFieldRaw } from 'bootstrap-vue-next';
import { computed, useSlots } from 'vue';
import TablePagination from '~/components/TablePagination.vue';

interface Props {
  items: T[];
  fields: Exclude<TableFieldRaw<T>, string>[];
  /** Texto exibido quando não há itens. */
  emptyText?: string;
  /** Termo de filtro repassado ao BTable (filtro client-side). */
  filter?: string;
  hover?: boolean;
  responsive?: boolean;
  showEmpty?: boolean;
  theadClass?: string;
  tableClass?: string;
  /** Quando false, não renderiza o BCard externo nem o rodapé de paginação. */
  card?: boolean;
  /** Controle de paginação. Omita para ocultar o rodapé. */
  perPage?: number;
  totalItems?: number;
  paginationLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emptyText: 'Nenhum registro encontrado.',
  hover: true,
  responsive: true,
  showEmpty: true,
  theadClass: 'bg-light bg-opacity-25 thead-sm',
  tableClass: 'table table-custom table-centered mb-0 w-100',
  card: true,
});

/** Página atual (v-model:current-page). */
const currentPage = defineModel<number>('currentPage', { default: 1 });

const slots = useSlots();

/** Slots repassados ao BTable (todos exceto o de cabeçalho do card). */
const tableSlots = computed(() =>
  Object.keys(slots).filter((name) => name !== 'header'),
);

const showPagination = computed(
  () => props.totalItems != null && props.perPage != null,
);
</script>

<template>
  <component :is="card ? BCard : 'div'" :no-body="card || undefined">
    <BCardHeader v-if="$slots.header" class="border-light justify-content-between flex-wrap gap-3">
      <slot name="header" />
    </BCardHeader>

    <BTable
      :show-empty="showEmpty"
      :hover="hover"
      :responsive="responsive"
      :filter="filter"
      :empty-text="emptyText"
      :items="items"
      :fields="fields"
      :thead-class="theadClass"
      :class="tableClass"
    >
      <template v-for="name in tableSlots" #[name]="slotProps" :key="name">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </BTable>

    <BCardFooter v-if="showPagination" class="border-0">
      <TablePagination
        v-model:current-page="currentPage"
        :per-page="perPage!"
        :total-items="totalItems!"
        :label="paginationLabel"
      />
    </BCardFooter>
  </component>
</template>
