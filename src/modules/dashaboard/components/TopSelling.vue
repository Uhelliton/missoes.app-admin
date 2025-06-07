<template>
  <b-col md="6" lg="4">
    <b-card no-body>
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Bairros x Evangelismo</b-card-title>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <b-table-simple responsive class="mb-0">
          <b-tbody>
            <b-tr v-for="(item, idx) in topSelling" :key="idx">
              <b-td class="px-0">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 text-truncate">
                    <h6 class="m-0 text-truncate">{{ item.name }}</h6>
                    <div class="d-flex align-items-center">
                      <div
                        class="progress bg-primary-subtle w-100"
                        style="height: 5px"
                        role="progressbar"
                        aria-label="Success example"
                        :aria-valuenow="item.progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-primary"
                          :style="`width: ${item.progress}%`"
                        ></div>
                      </div>
                      <small class="flex-shrink-1 ms-1"
                        >{{ item.progress }}%</small
                      >
                    </div>
                  </div>
                </div>
              </b-td>
              <b-td class="px-0 text-end"
                ><span class="text-body ps-2 align-self-center text-end"
                  >{{ item.sales }}</span
                >
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { currency } from "@/infra/helpers/constants";
import { topSelling } from "@/views/dashboards/ecommerce/components/data";
</script>
