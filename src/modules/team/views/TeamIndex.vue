<template>
  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <BRow class="align-items-center">
            <div class="col">
              <BCardTitle>Customers</BCardTitle>
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto">
                  <BButton type="button" variant="primary"> <i class="fa-solid fa-plus me-1"></i> Add Product </BButton>
                </div>
              </form>
            </div>
          </BRow>
        </BCardHeader>
        <BCardBody class="pt-0">
          <BTableSimple responsive class="mb-0 checkbox-all text-nowrap" id="datatable_1">
            <b-thead class="table-light">
              <b-tr>
                <b-th class="ps-0">Customer</b-th>
                <b-th>Email</b-th>
                <b-th>Status</b-th>
                <b-th>Order</b-th>
                <b-th>Spent</b-th>
                <b-th class="text-end">Action</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, idx) in customersData" :key="idx">
                <b-td class="ps-0">
                  <img :src="item.customer.avatar" alt="" class="thumb-md d-inline rounded-circle me-1" />{{ ' ' }}
                  <p class="d-inline-block align-middle mb-0">
                    <span class="font-13 fw-medium">{{ item.customer.name }}</span>
                  </p>
                </b-td>
                <b-td
                  ><a href="" class="d-inline-block align-middle mb-0 text-body">{{ item.email }}</a>
                </b-td>
                <b-td v-if="item.status === 'VIP'">
                  <b-badge :variant="null" class="bg-danger-subtle text-danger">
                    {{ kebabToTitleCase(item.status) }}
                  </b-badge>
                </b-td>
                <b-td v-else-if="item.status === 'inactive'">
                  <b-badge :variant="null" class="bg-secondary-subtle text-secondary">
                    {{ kebabToTitleCase(item.status) }}
                  </b-badge>
                </b-td>
                <b-td v-else-if="item.status === 'repeat'">
                  <b-badge :variant="null" class="bg-blue-subtle text-blue">
                    {{ kebabToTitleCase(item.status) }}
                  </b-badge>
                </b-td>
                <b-td v-else>
                  <b-badge :variant="null" class="bg-success-subtle text-success">
                    {{ kebabToTitleCase(item.status) }}
                  </b-badge>
                </b-td>
                <b-td>{{ item.order }}</b-td>
                <b-td>{{ currency }}{{ item.spent }}</b-td>
                <b-td class="text-end">
                  <a href="#"><i class="las la-pen text-secondary fs-18"></i></a>
                  <a href="#"><i class="las la-trash-alt text-secondary fs-18"></i></a>
                </b-td>
              </b-tr>
            </b-tbody>
          </BTableSimple>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { DataTable } from 'simple-datatables'
import { currency } from '@/infra/helpers/constants'
import { kebabToTitleCase } from '@/infra/helpers/change-casing'
import { customersData } from '@/views/apps/ecommerce/customers/components/data'
import { TeamService } from '@/modules/team/services/team.service'

const teamService = TeamService()

onMounted(async () => {
  await fetchTeams()
  new DataTable('#datatable_1', {
    searchable: true,
    fixedHeight: false,
    classes: {
      table: 'datatable-table mb-0',
    },
  })
})

const fetchTeams = async () => {
  await teamService.getAll()
}
</script>
