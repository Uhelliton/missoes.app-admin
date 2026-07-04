<script setup lang="ts">
import { reactive, onMounted, ref, computed, watch } from 'vue';

import { BButton, BCol, BFormInput, BRow } from 'bootstrap-vue-next';

import PageBreadcrumb from '~/components/PageBreadcrumb.vue';
import { PeopleService } from '../services/people.service.ts';
import { CityService } from '../services/city.service.ts';
import {
  normalizePeopleDetailFromApi,
} from '../utils/people-api.util.ts';
import { usePeopleLookups } from '../composables/usePeopleLookups.ts';
import PeopleForm from '../components/PeopleForm.vue';
import type {
  ILookupItem,
  IPeopleCreatePayload,
  IPeopleListItem,
} from '../interfaces/people.interface.ts';
import { useToast } from '@/infra/composables/useToast.ts';
import { KDataTable } from '~/ui/components/table';
import Icon from '~/components/wrappers/Icon.vue';

const peopleService = PeopleService();
const cityService = CityService();
const toast = useToast();
const searchQuery = ref('');

/** Listas de apoio (lookups) que alimentam os selects do formulário. */
const { lookups, loadLookups } = usePeopleLookups();

const cities = ref<ILookupItem[]>([]);
const districts = ref<ILookupItem[]>([]);
const submitting = ref(false);

const fields = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'E-mail', sortable: true },
  { key: 'cpf', label: 'CPF', sortable: true },
  { key: 'phone', label: 'Telefone' },
  { key: 'memberSince', label: 'Membro desde' },
  { key: 'actions', label: 'Ações', class: 'text-end' },
];

const dataTable = reactive({
  items: [] as IPeopleListItem[],
  pagination: {
    currentPage: 1,
    perPage: 12,
    totalItems: 0,
  },
});

const peopleFormRef = ref<InstanceType<typeof PeopleForm> | null>(null);

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return dataTable.items;
  return dataTable.items.filter((row) =>
    [row.name, row.email, row.cpf, row.phone, row.phoneNumber, row.memberSince]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q)),
  );
});

const loadPeople = async () => {
  try {
    const params: Record<string, string | number> = {
      page: dataTable.pagination.currentPage,
      perPage: dataTable.pagination.perPage,
    };
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }
    const response = await peopleService.getAll(params);
    const items = response.data.items ?? [];
    dataTable.items = items.map((row) => {
      const r = row as IPeopleListItem & { id: number | string };
      return {
        ...(r as IPeopleListItem),
        id: Number(r.id),
        phone: r.phoneNumber ?? r.phone,
        memberSince: r.conversionDate ?? r.date ?? r.memberSince,
      };
    });
    dataTable.pagination = {
      currentPage: response.data.meta.currentPage,
      perPage: response.data.meta.perPage,
      totalItems: response.data.meta.totalItems,
    };
  } catch (e) {
    console.error(e);
    toast.error('Erro ao carregar pessoas. Verifique a conexão com a API.');
  }
};

/** Recarrega a listagem quando a página atual muda (paginação server-side). */
watch(
  () => dataTable.pagination.currentPage,
  (page, prev) => {
    if (page !== prev) loadPeople();
  },
);


const loadReferenceData = async () => {
  try {
    await loadLookups();
  } catch {
    toast.error('Falha ao carregar listas do formulário. Verifique a API.');
  }
};


const handleCreate = async () => {
  peopleFormRef.value?.openModal();
};

const handleEdit = async (item: IPeopleListItem) => {
  await loadReferenceData();
  try {
    const res = await peopleService.getById(item.id);
    const detail = normalizePeopleDetailFromApi(res.data);
    if (!detail) {
      toast.error('Resposta inválida ao carregar pessoa.');
      return;
    }
    const cityId = detail.address.cityId || cities.value[0]?.id || 0;
    if (cityId) {
      await ensureCityOption(cityId);
      await loadCityDistricts(cityId);
    }
    peopleFormRef.value?.openModal(detail);
  } catch {
    toast.error('Erro ao carregar dados da pessoa.');
  }
};


const handleSubmit = async (payload: IPeopleCreatePayload, id: number | null) => {

};

const handleDelete = async (item: IPeopleListItem) => {
  if (!confirm(`Remover "${item.name}"? Esta ação não pode ser desfeita.`)) {
    return;
  }
  try {
    await peopleService.remove(item.id);
    toast.success('Pessoa removida com sucesso.');
    await loadPeople();
  } catch (e) {
    console.error(e);
    toast.error('Erro ao remover pessoa.');
  }
};

onMounted(async () => {
  await loadPeople();
  await loadReferenceData();
});
</script>

<template>
  <div class="kt-container-fluid">
    <PageBreadcrumb title="Pessoas" subtitle="Membros" />

    <BRow>
      <BCol cols="12">
        <KDataTable
          v-model:current-page="dataTable.pagination.currentPage"
          :items="filteredItems"
          :fields="fields"
          :per-page="dataTable.pagination.perPage"
          :total-items="dataTable.pagination.totalItems"
          empty-text="Nenhum membro encontrado."
          pagination-label="membros"
        >
          <template #header>
            <div class="d-flex gap-2 flex-wrap align-items-center flex-grow-1">
              <BFormInput
                v-model="searchQuery"
                type="text"
                class="flex-grow-1"
                style="max-width: 320px"
                placeholder="Buscar membros…"
                @keyup.enter="loadPeople"
              />
              <BButton variant="outline-primary" @click="loadPeople">
                Atualizar
              </BButton>
              <BButton variant="primary" @click="handleCreate">
                Novo membro
              </BButton>
            </div>
          </template>

          <template #head(actions)>
            <span class="text-uppercase fs-xxs d-flex justify-content-end">Ações</span>
          </template>

          <template #cell(name)="{ item }">
            <div class="d-flex align-items-center gap-2">
              <img alt="" class="rounded-circle" src="/images/inuvy-logo.png" height="36" width="36" />
              <span class="fw-semibold">{{ item.name }}</span>
            </div>
          </template>

          <template #cell(email)="{ item }">
            {{ item.email ?? '—' }}
          </template>

          <template #cell(cpf)="{ item }">
            {{ item.cpf ?? '—' }}
          </template>

          <template #cell(phone)="{ item }">
            {{ item.phone ?? item.phoneNumber ?? '—' }}
          </template>

          <template #cell(memberSince)="{ item }">
            {{ item.memberSince ?? '—' }}
          </template>

          <template #cell(actions)="{ item }">
            <div class="d-flex justify-content-end gap-1">
              <BButton size="sm" variant="light" class="btn-icon" title="Editar" @click="handleEdit(item)">
                <i class="ki-outline ki-notepad-edit fs-lg"></i>
              </BButton>
              <BButton size="sm" variant="light" class="btn-icon text-danger" title="Remover" @click="handleDelete(item)">
                <Icon icon="edit" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </KDataTable>
      </BCol>
    </BRow>
  </div>

  <PeopleForm
    ref="peopleFormRef"
    :genders="lookups.genders"
    :categories="lookups.categories"
    :origins="lookups.origins"
    :marital-statuses="lookups.maritalStatuses"
    :education-levels="lookups.educationLevels"
    :member-types="lookups.memberTypes"
    :positions="lookups.positions"
    :ministries="lookups.ministries"
    :cities="cities"
    :districts="districts"
    :submitting="submitting"
    @submit="handleSubmit"
    @city-change="handleCityChange"
  />
</template>
