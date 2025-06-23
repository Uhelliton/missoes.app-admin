<template>
  <b-col md="6" lg="4">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Top 10 Membros X Evangelismo</b-card-title>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <b-table-simple responsive class="mb-0">
          <b-tbody>
            <b-tr v-for="(item, idx) in orderList" :key="idx">
              <b-td class="px-0">
                <div class="d-flex align-items-center">
                  <img
                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1745180411.jpg"
                    height="36"
                    class="me-2 align-self-center rounded"
                    alt="..."
                  />
                  <div class="flex-grow-1 text-truncate">
                    <h6 class="m-0 text-truncate">{{ item.name }}</h6>
                    <span class="font-12 text-muted">{{ item.id }}</span>
                  </div>
                </div>
              </b-td>
              <b-td class="px-0 text-end"
                ><span class="text-secondary-emphasis fw-semibold ps-2 align-self-center text-end">{{
                  item.amount
                }}</span>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { currency } from '@/infra/helpers/constants'
import { orderList } from '@/views/dashboards/ecommerce/components/data'
</script>
