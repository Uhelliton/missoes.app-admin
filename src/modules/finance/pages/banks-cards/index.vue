<template>
  <PageBreadcrumb title="Banks & cards" subtitle="Finance" />

  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardBody>
          <BRow class="mb-2">
            <BCol cols="12" class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-semibold fs-base text-muted text-uppercase mb-0">Bank Accounts</h5>
              <BButton size="sm" variant="primary" @click="showBankModal = true"> <Icon icon="plus" class="me-1" /> Add Bank </BButton>
            </BCol>

            <BCol md="6" xxl="4" v-for="(item, idx) in bankAccountData" :key="idx">
              <BCard no-body class="border border-dashed shadow-none">
                <BCardBody class="d-flex justify-content-between">
                  <div class="d-flex gap-3">
                    <div class="avatar avatar-lg flex-shrink-0">
                      <span :class="`avatar-title ${item.iconClassName} rounded-circle fs-24`">
                        <Icon :icon="item.icon" />
                      </span>
                    </div>
                    <div>
                      <h5 class="fw-semibold mb-1">{{ item.name }}</h5>
                      <p class="text-muted mb-3 fs-sm">Balance: {{ item.balance }} USD</p>

                      <ul class="list-unstyled mb-0">
                        <li><strong class="text-muted">Account Holder:</strong> {{ item.holder }}</li>
                        <li><strong class="text-muted">Account No:</strong> {{ item.accountNo }}</li>
                        <li><strong class="text-muted">Account Type:</strong> {{ item.type }}</li>
                        <li><strong class="text-muted">Branch:</strong> {{ item.branch }}</li>
                      </ul>
                      <div class="mt-3 d-flex gap-1">
                        <BButton size="sm" class="btn-default">Edit</BButton>
                        <BButton size="sm" class="btn-default">Delete</BButton>
                      </div>
                    </div>
                  </div>
                  <div class="text-end">
                    <span :class="`badge ${item.status === 'active' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'} mb-2`">
                      {{ toPascalCase(item.status) }}
                    </span>
                  </div>
                </BCardBody>
              </BCard>
            </BCol>
          </BRow>

          <BRow>
            <BCol cols="12" class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-semibold fs-base text-muted text-uppercase mb-0">Cards</h5>
              <BButton size="sm" variant="primary" @click="showCardModal = true">
                <span>
                  <Icon icon="plus" class="me-1" />
                </span>
                Add Card
              </BButton>
            </BCol>

            <BCol md="6" xxl="3" v-for="(item, idx) in paymentCardsData" :key="idx">
              <BCard no-body class="border border-dashed shadow-none">
                <BCardBody>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <img :src="item.image" alt="Visa" height="36" />
                    <span :class="`badge ${item.status === 'active' ? 'bg-success-subtle text-success' : item.status === 'inactive' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'}`">
                      {{ toPascalCase(item.status) }}
                    </span>
                  </div>
                  <h4 class="fw-semibold mt-3">{{ item.number }}</h4>
                  <p class="text-muted fs-sm mb-0">Exp: {{ item.expiryDate }}</p>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="fw-medium text-dark">{{ item.holder }}</span>
                    <BDropdown toggle-class="content-none btn-sm btn-light btn-icon rounded-circle" class="">
                      <template #button-content>
                        <Icon icon="dots-vertical" />
                      </template>
                      <BDropdownItem>Set as Default</BDropdownItem>
                      <BDropdownItem>Edit</BDropdownItem>
                      <BDropdownItem>Remove</BDropdownItem>
                    </BDropdown>
                  </div>
                </BCardBody>
              </BCard>
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BModal v-model="showBankModal" centered hide-footer title="Add New Bank Account" ok-title="Save Bank" cancel-variant="light">
    <form @submit.prevent="saveBank">
      <div class="mb-3">
        <label class="form-label">Bank Name</label>
        <BFormInput type="text" placeholder="Enter bank name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Account Holder</label>
        <BFormInput type="text" placeholder="Enter account holder name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Account Number</label>
        <BFormInput type="text" placeholder="Enter account number" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Account Type</label>
        <BFormSelect required>
          <option value="">Select type</option>
          <option>Checking</option>
          <option>Savings</option>
          <option>Business</option>
        </BFormSelect>
      </div>

      <div class="mb-3">
        <label class="form-label">Branch</label>
        <BFormInput type="text" placeholder="Enter branch name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Balance</label>
        <BFormInput type="number" placeholder="Enter balance amount" required />
      </div>

      <div>
        <label class="form-label">Status</label>
        <BFormSelect v-model="status">
          <option>Active</option>
          <option>Inactive</option>
        </BFormSelect>
      </div>
    </form>
  </BModal>

  <BModal v-model="showCardModal" centered hide-footer title="Add New Card" ok-title="Save Card" cancel-variant="light">
    <form @submit.prevent="saveCard">
      <div class="mb-3">
        <label class="form-label">Card Holder Name</label>
        <BFormInput type="text" placeholder="Enter card holder name" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Card Number</label>
        <BFormInput type="text" placeholder="XXXX XXXX XXXX XXXX" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Card Type</label>
        <BFormSelect required>
          <option value="">Select type</option>
          <option>Credit Card</option>
          <option>Debit Card</option>
          <option>Prepaid Card</option>
        </BFormSelect>
      </div>

      <div class="mb-3">
        <label class="form-label">Expiry Date</label>
        <FlatPickr v-model="expiryDate" class="form-control" type="date" :config="{ dateFormat: 'M, Y', defaultDate: 'today' }" />
      </div>

      <div class="mb-3">
        <label class="form-label">CVV</label>
        <BFormInput type="password" placeholder="***" maxlength="3" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Bank Name</label>
        <BFormInput type="text" placeholder="Enter bank name" required />
      </div>

      <div>
        <label class="form-label">Status</label>
        <BFormSelect v-model="status">
          <option>Active</option>
          <option>Inactive</option>
        </BFormSelect>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardBody, BDropdown, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { bankAccountData, paymentCardsData } from './components/data'
const showBankModal = ref(false)
const showCardModal = ref(false)
const status = ref('Active')
const expiryDate = ref('')

const bankForm = ref({
  name: '',
  holder: '',
  number: '',
  type: '',
  branchs: '',
  balance: '',
})

const cardForm = ref({
  holder: '',
  number: '',
  type: '',
  exp: '',
  bank: '',
})

function saveBank() {
  console.log('Bank saved:', bankForm.value)
  showBankModal.value = false
}

function saveCard() {
  console.log('Card saved:', cardForm.value)
  showCardModal.value = false
}
</script>
