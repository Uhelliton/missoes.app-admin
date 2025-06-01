<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body>
        <b-card-header>
          <b-row class="align-items-center">
            <div class="col">
              <b-card-title>Gerenciar Membros</b-card-title>
            </div>
            <div class="col-auto">
              <form class="row g-2">
                <div class="col-auto">
                  <b-button type="button" variant="primary" @click="dialogMember = !dialogMember">
                    <i class="fa-solid fa-plus me-1"></i> Novo Membro
                  </b-button>
                </div>
              </form>
            </div>
          </b-row>
        </b-card-header>
        <b-card-body class="pt-0">
          <b-table-simple
            responsive
            class="mb-0 checkbox-all text-nowrap"
            id="datatable_1"
          >
            <b-thead class="table-light">
              <b-tr>
                <b-th class="ps-0">ID</b-th>
                <b-th class="ps-0">Nome</b-th>
                <b-th>Email</b-th>
                <b-th>CPF</b-th>
                <b-th>Sexo</b-th>
                <b-th>Cidade</b-th>
                <b-th class="text-end"></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, idx) in dataTable.rows" :key="idx">
                <b-td>{{ item.id }}</b-td>
                <b-td class="ps-0"><!--
                  <img
                    :src="item.customer.avatar"
                    alt=""
                    class="thumb-md d-inline rounded-circle me-1"
                  />{{ " " }}-->
                  <p class="d-inline-block align-middle mb-0">
                    <span class="font-13 fw-medium">{{ item.name }}</span>
                  </p>
                </b-td>
                <b-td>
                  <a href="" class="d-inline-block align-middle mb-0 text-body">{{ item.email }}</a>
                </b-td>
                <b-td>{{ item.cpf }}</b-td>
                <b-td>
                  <b-badge :variant="null" class="bg-danger-subtle text-danger">
                    {{ kebabToTitleCase(item.gender) }}
                  </b-badge>
                </b-td>
                <b-td>{{ item.city.name }}</b-td>
                <b-td class="text-end">
                  <a href="#"><i class="las la-pen text-secondary fs-18"></i></a>
                  <a href="#"><i class="las la-trash-alt text-secondary fs-18"></i></a>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <FormMember
    :is-open="dialogMember"
    @close="() => dialogMember = false"
    @created="fetchMembers"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { DataTable } from "simple-datatables";
import { currency } from "@/infra/helpers/constants";
import { kebabToTitleCase } from "@/infra/helpers/change-casing";
import { customersData } from "@/views/apps/ecommerce/customers/components/data";
import FormMember from "@/modules/team/components/FormMember.vue";
import { MemberService } from "@/modules/team/services/member.service";

const memberService = MemberService()
const dialogMember = ref(false)
const dataTable = reactive({
  rows: [],
  currentPage: 1,
  total: 0
})

onMounted(async () => {
  await fetchMembers()

  new DataTable("#datatable_1", {
    searchable: true,
    fixedHeight: false,
    classes: {
      table: "datatable-table mb-0",
    },
  });
});

const fetchMembers = async () => {
  const response = await memberService.getAll()
  dataTable.rows = response.data.items
  dataTable.total = response.data.meta.totalItems
  dataTable.currentPage = response.data.meta.currentPage
}
</script>
