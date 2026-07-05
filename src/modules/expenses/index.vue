<template>
  <PageBreadcrumb title="Expenses" subtitle="Finance" />

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1">
    <BCol v-for="(card, idx) in expenseCardData" :key="idx">
      <ExpensesCard :item="card" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput v-model="searchQuery" type="text" placeholder="Search expenses..." />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>

            <BButton variant="primary" @click="showAddExpenseModal = !showAddExpenseModal"> <Icon icon="plus" class="me-1" /> Add Expense </BButton>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="me-2 fw-semibold">Filter By:</span>

            <div class="app-search">
              <BFormSelect v-model="filterCategory" class="form-control my-1 my-md-0">
                <option value="">Category</option>
                <option>Office Supplies</option>
                <option>Travel</option>
                <option>Meals</option>
                <option>Entertainment</option>
                <option>Equipment</option>
                <option>Utilities</option>
                <option>Maintenance</option>
              </BFormSelect>
              <Icon icon="category" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="filterStatus" class="form-control my-1 my-md-0">
                <option value="">Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
                <option>Reimbursed</option>
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
          empty-text="No expenses found."
          v-model:selected-rows="selected"
          :items="filteredExpenses"
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
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>

          <template #cell(select)="{ item }">
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" :checked="selected.includes(item)" @change="(e: Event) => onToggleRow(item, e)" />
          </template>

          <template #cell(id)="{ item }">
            <RouterLink to="" class="fw-semibold link-reset">{{ item.id }}</RouterLink>
          </template>

          <template #cell(title)="{ item }">{{ item.title }}</template>
          <template #cell(category)="{ item }">{{ item.category }}</template>

          <template #cell(paymentMethod)="{ item }">
            <div class="d-flex align-items-center">
              <img :src="item.paymentMethod.image" class="me-2" height="26" />
              <span>{{ item.paymentMethod.number }}</span>
            </div>
          </template>

          <template #cell(amount)="{ item }">${{ item.amount.toFixed(2) }}</template>

          <template #cell(status)="{ item }">
            <span :class="`badge ${item.status === 'approved' ? 'bg-success-subtle text-success' : item.status === 'pending' ? 'bg-warning-subtle text-warning' : item.status === 'rejected' ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'} badge-label`">
              {{ toPascalCase(item.status) }}
            </span>
          </template>

          <template #cell(date)="{ item }">
            {{ item.date }} <small class="text-muted">{{ item.time }}</small>
          </template>

          <template #cell(addedBy)="{ item }">
            <div class="d-flex gap-2 align-items-center">
              <img :src="item.addedBy.image" class="avatar-xs rounded-circle" />
              <span>{{ item.addedBy.name }}</span>
            </div>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <button class="btn btn-default btn-icon btn-sm"><Icon icon="eye" class="fs-lg" /></button>
              <button class="btn btn-default btn-icon btn-sm"><Icon icon="edit" class="fs-lg" /></button>
              <button class="btn btn-default btn-icon btn-sm" @click="handleDeleteItem(item)">
                <Icon icon="trash" class="fs-lg" />
              </button>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="Expenses" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showAddExpenseModal" title="Add New Expense" hide-footer centered size="lg" title-class="fw-semibold" aria-labelledby="addClientModalLabel" ok-title="Save Expense" cancel-variant="light">
    <form @submit.prevent="addExpense">
      <BRow class="g-3">
        <BCol md="6">
          <label for="expenseTitle" class="form-label">Expense Title <span class="text-danger">*</span></label>
          <BFormInput type="text" id="expenseTitle" placeholder="Enter expense title" required />
        </BCol>

        <BCol md="6">
          <label for="expenseAmount" class="form-label">Amount ($) <span class="text-danger">*</span></label>
          <BFormInput type="number" step="0.01" id="expenseAmount" placeholder="Enter amount" required />
        </BCol>

        <BCol md="6">
          <label for="expenseCategory" class="form-label">Category <span class="text-danger">*</span></label>
          <BFormSelect id="expenseCategory" required>
            <option value="">Select category</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Travel">Travel</option>
            <option value="Meals">Meals</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Equipment">Equipment</option>
            <option value="Utilities">Utilities</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Training & Events">Training & Events</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="expensePayment" class="form-label">Payment Method</label>
          <BFormSelect id="expensePayment">
            <option value="">Select payment method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="expenseStatus" class="form-label">Status</label>
          <BFormSelect id="expenseStatus">
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Reimbursed">Reimbursed</option>
          </BFormSelect>
        </BCol>

        <BCol md="6">
          <label for="expenseDate" class="form-label">Date & Time</label>
          <FlatPickr v-model="expenseDate" class="form-control" type="date" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>

        <BCol cols="12">
          <label for="expenseDesc" class="form-label">Description</label>
          <BFormTextarea id="expenseDesc" rows="3" placeholder="Optional notes or description"></BFormTextarea>
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { toPascalCase } from '~/utils/helpers'
import { expenseCardData, expensesData, type ExpenseType } from './components/data'
import ExpensesCard from './components/ExpensesCard.vue'

// States
const showAddExpenseModal = ref(false)
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const expenseDate = ref('')
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(expensesData.length)
const expenseData = ref<ExpenseType[]>(expensesData)

// Options
const perPageOptions = [5, 8, 10, 15, 20]

const newExpense = ref({
  title: '',
  amount: 0,
  category: '',
  paymentMethod: '',
  status: 'Pending',
  date: '',
  description: '',
})

// Table fields
const fields = [
  { key: 'select', label: '', thStyle: { width: '40px' } },
  { key: 'id', label: 'ID', sortable: true },
  { key: 'title', label: 'Expense Title', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'paymentMethod', label: 'Payment Method', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'addedBy', label: 'Added By', sortable: true },
  { key: 'action', label: 'Actions', sortable: false },
]

function addExpense() {
  const id = `EXP-${Math.floor(Math.random() * 10000)}`
  const now = new Date()
  const newItem: ExpenseType = {
    id,
    title: newExpense.value.title,
    category: newExpense.value.category || 'General',
    paymentMethod: {
      image: '/images/payment/paypal.svg',
      number: newExpense.value.paymentMethod || 'Cash',
    },
    amount: newExpense.value.amount,
    status: newExpense.value.status as 'approved' | 'pending' | 'rejected' | 'reimbursed',
    date: newExpense.value.date || now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    addedBy: {
      name: 'Admin',
      image: '/images/users/avatar-1.jpg',
    },
  }

  expenseData.value.unshift(newItem)
  updateTotalRows()
  showAddExpenseModal.value = false

  newExpense.value = {
    title: '',
    amount: 0,
    category: '',
    paymentMethod: '',
    status: 'Pending',
    date: '',
    description: '',
  }
}

// Use table actions
const { selected, toggleSelectAll, onToggleRow, deleteItem, deleteSelected, allSelected, isIndeterminate } = useTableActions(expenseData)

// Computed filtered data
const filteredExpenses = computed(() =>
  expenseData.value.filter(
    (e) => (!filterCategory.value || e.category === filterCategory.value) && (!filterStatus.value || e.status === filterStatus.value) && (e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
)

// Update total rows
const updateTotalRows = () => {
  totalRows.value = filteredExpenses.value.length
  if (currentPage.value > Math.ceil(totalRows.value / perPage.value)) currentPage.value = 1
}

// Delete handlers
function handleDeleteItem(item: ExpenseType) {
  deleteItem(item)
  updateTotalRows()
}

function handleDeleteSelected() {
  deleteSelected()
  updateTotalRows()
}
</script>
