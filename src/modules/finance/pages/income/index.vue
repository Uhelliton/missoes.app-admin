<template>
  <PageBreadcrumb title="Financeiro" subtitle="Receitas" />

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1">
    <BCol v-for="(item, idx) in incomeStatData" :key="idx">
      <IncomeCard :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="text" placeholder="Buscar receitas..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Excluir </BButton>

            <BButton variant="primary" @click="showAddIncomeModal = !showAddIncomeModal"> <Icon icon="plus" class="me-1" /> Adicionar receita </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="me-2 fw-semibold">Filtrar por:</span>

            <div class="app-search">
              <BFormSelect v-model="filterCategory" class="form-control my-1 my-md-0">
                <option value="">Origem</option>
                <option value="Sales">Vendas</option>
                <option value="Services">Serviços</option>
                <option value="Consulting">Consultoria</option>
                <option value="Investments">Investimentos</option>
                <option value="Affiliate">Afiliados</option>
                <option value="Other">Outros</option>
              </BFormSelect>
              <Icon icon="briefcase" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="filterStatus" class="form-control my-1 my-md-0">
                <option value="">Status</option>
                <option value="received">Recebido</option>
                <option value="pending">Pendente</option>
                <option value="refunded">Reembolsado</option>
              </BFormSelect>
              <Icon icon="circle-check" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>
          </div>
        </BCardHeader>

        <BTable
          show-empty
          hover
          responsive
          empty-text="Nenhum registro de receita encontrado."
          v-model:selected-rows="selected"
          :items="filteredIncomes"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          thead-class="bg-light bg-opacity-25 thead-sm"
          class="table table-custom table-centered table-select mb-0 w-100"
        >
          <template #head()="item">
            <span class="text-uppercase fs-xxs">{{ item.label }}</span>
          </template>

          <template #head(select)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>

          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Ações</span>
          </template>

          <template #cell(select)="{ item }">
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="selected.includes(item)" @change="(e: Event) => onToggleRow(item, e)" />
          </template>

          <template #cell(id)="{ item }">
            <RouterLink to="#!" class="fw-semibold link-reset">{{ item.id }}</RouterLink>
          </template>

          <template #cell(title)="{ item }">{{ item.title }}</template>
          <template #cell(category)="{ item }">{{ categoryLabel(item.category) }}</template>

          <template #cell(paymentMethod)="{ item }">
            <div class="d-flex align-items-center">
              <img :src="item.image" class="me-2" height="26" />
              <span>{{ item.paymentMethod }}</span>
            </div>
          </template>

          <template #cell(amount)="{ item }">{{ formatCurrency(item.amount) }}</template>

          <template #cell(status)="{ item }">
            <span :class="`badge ${item.status === 'received' ? 'bg-success-subtle text-success' : item.status === 'pending' ? 'bg-warning-subtle text-warning' : item.status === 'refunded' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'} badge-label`">
              {{ statusLabel(item.status) }}
            </span>
          </template>

          <template #cell(date)="{ item }">
            {{ item.date }} <small class="text-muted">{{ item.time }}</small>
          </template>

          <template #cell(addedBy)="{ item }">
            <div class="d-flex gap-2 align-items-center">
              <img :src="item.receivedBy.image" class="avatar-xs rounded-circle" />
              <span>{{ item.receivedBy.name }}</span>
            </div>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon"><Icon icon="eye" class="fs-lg" /></BButton>
              <BButton size="sm" class="btn-default btn-icon"><Icon icon="edit" class="fs-lg" /></BButton>
              <BButton size="sm" class="btn-default btn-icon" @click="handleDeleteItem(item)">
                <Icon icon="trash" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="Receitas" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showAddIncomeModal" title="Adicionar nova receita" hide-footer centered size="lg" ok-title="Salvar receita" title-class="fw-bold h5" cancel-variant="light">
    <form @submit.prevent="addIncome">
      <BRow class="g-3">
        <BCol md="6">
          <label class="form-label">Título <span class="text-danger">*</span></label>
          <BFormInput v-model="newIncome.title" type="text" placeholder="Digite o título da receita" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Valor (R$) <span class="text-danger">*</span></label>
          <BFormInput v-model.number="newIncome.amount" type="number" step="0.01" placeholder="Digite o valor" required />
        </BCol>

        <BCol md="6">
          <label class="form-label">Origem <span class="text-danger">*</span></label>
          <BFormSelect v-model="newIncome.category">
            <option value="">Selecione a origem</option>
            <option value="Sales">Vendas</option>
            <option value="Services">Serviços</option>
            <option value="Consulting">Consultoria</option>
            <option value="Investments">Investimentos</option>
            <option value="Affiliate">Afiliados</option>
            <option value="Other">Outros</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Forma de pagamento</label>
          <BFormSelect v-model="newIncome.paymentMethod">
            <option value="">Selecione a forma de pagamento</option>
            <option value="Credit Card">Cartão de crédito</option>
            <option value="Debit Card">Cartão de débito</option>
            <option value="Cash">Dinheiro</option>
            <option value="Bank Transfer">Transferência bancária</option>
            <option value="PayPal">PayPal</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="incomeClient" class="form-label">Cliente</label>
          <BFormInput type="text" id="incomeClient" placeholder="Digite o nome do cliente ou empresa" />
        </BCol>

        <BCol md="6">
          <label class="form-label">Status</label>
          <BFormSelect v-model="newIncome.status">
            <option value="received">Recebido</option>
            <option value="pending">Pendente</option>
            <option value="failed">Falhou</option>
            <option value="refunded">Reembolsado</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label class="form-label">Data e hora</label>
          <FlatPickr v-model="date" class="form-control" type="date" :config="{ dateFormat: 'd M, Y h:i', defaultDate: 'today' }" />
        </BCol>

        <BCol md="6">
          <label for="incomeReceivedBy" class="form-label">Recebido por</label>
          <div class="d-flex align-items-center gap-2">
            <img src="/images/users/user-5.jpg" alt="user" class="avatar-xs rounded-circle" />
            <BFormInput type="text" id="incomeReceivedBy" placeholder="Digite o nome de quem recebeu" />
          </div>
        </BCol>

        <BCol cols="12">
          <label class="form-label">Observações</label>
          <BFormTextarea v-model="newIncome.description" rows="3" placeholder="Observações ou descrição (opcional)"></BFormTextarea>
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BModal, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/infra/composables/useTableActions'
import { incomeData, incomeStatData, type IncomeType } from './components/data'
import IncomeCard from './components/IncomeCard.vue'
import { toPascalCase } from '~/infra/utils/helpers'

const showAddIncomeModal = ref(false)
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const date = ref('')
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(incomeData.length)
const incomeDataList = ref<IncomeType[]>(incomeData)
const perPageOptions = [5, 8, 10, 15, 20]

const newIncome = ref({
  title: '',
  amount: 0,
  category: '',
  paymentMethod: '',
  status: 'received',
  date: '',
  description: '',
})

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function statusLabel(status: IncomeType['status']) {
  switch (status) {
    case 'received':
      return 'Recebido'
    case 'pending':
      return 'Pendente'
    case 'refunded':
      return 'Reembolsado'
    case 'failed':
      return 'Falhou'
    default:
      return toPascalCase(status)
  }
}

function categoryLabel(category: string) {
  switch (category) {
    case 'Sales':
      return 'Vendas'
    case 'Services':
      return 'Serviços'
    case 'Consulting':
      return 'Consultoria'
    case 'Investments':
      return 'Investimentos'
    case 'Affiliate':
      return 'Afiliados'
    case 'Other':
      return 'Outros'
    default:
      return category
  }
}

// Table fields
const fields = [
  { key: 'select', label: '', thStyle: { width: '40px' } },
  { key: 'id', label: 'ID', sortable: true },
  { key: 'title', label: 'Título', sortable: false },
  { key: 'category', label: 'Origem', sortable: true },
  { key: 'paymentMethod', label: 'Forma de pagamento', sortable: false },
  { key: 'amount', label: 'Valor', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Data', sortable: true },
  { key: 'addedBy', label: 'Recebido por', sortable: true },
  { key: 'action', label: 'Ações' },
]

// Add income function
function addIncome() {
  const id = `INC-${Math.floor(Math.random() * 10000)}`
  const now = new Date()

  const newItem: IncomeType = {
    id,
    title: newIncome.value.title,
    category: newIncome.value.category || 'General',
    paymentMethod: newIncome.value.paymentMethod || 'Cash',
    amount: newIncome.value.amount,
    status: newIncome.value.status as 'received' | 'pending' | 'refunded' | 'failed',
    date: newIncome.value.date || now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    receivedBy: {
      image: '/images/users/avatar-1.jpg',
      name: 'Admin',
    },
    image: '/images/payment/visa.svg',
  }

  incomeDataList.value.unshift(newItem)
  updateTotalRows()
  showAddIncomeModal.value = false

  newIncome.value = {
    title: '',
    amount: 0,
    category: '',
    paymentMethod: '',
    status: 'received',
    date: '',
    description: '',
  }
}

const { selected, toggleSelectAll, onToggleRow, deleteItem, deleteSelected, allSelected, isIndeterminate } = useTableActions(incomeDataList)

const filteredIncomes = computed(() =>
  incomeDataList.value.filter(
    (e) => (!filterCategory.value || e.category === filterCategory.value) && (!filterStatus.value || e.status === filterStatus.value) && (e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
)

const updateTotalRows = () => {
  totalRows.value = filteredIncomes.value.length
  if (currentPage.value > Math.ceil(totalRows.value / perPage.value)) currentPage.value = 1
}

function handleDeleteItem(item: IncomeType) {
  deleteItem(item)
  updateTotalRows()
}

function handleDeleteSelected() {
  deleteSelected()
  updateTotalRows()
}
</script>
