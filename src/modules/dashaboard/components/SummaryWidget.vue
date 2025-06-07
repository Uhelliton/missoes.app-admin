<template>
  <b-col md="12" lg="4">
    <b-card no-body style="min-height: 396px">
      <b-card-header>
        <b-row class="align-items-center">
          <div class="col">
            <b-card-title>Dados Gerais</b-card-title>
          </div>
          <div class="col-auto">
            <b-dropdown variant="light" menu-class="dropdown-menu-end">
              <template #button-content>
                <i class="icofont-calendar fs-5 me-1"></i>Ano 2025<i
                class="las la-angle-down ms-1"
              ></i>
              </template>
            </b-dropdown>
          </div>
        </b-row>
      </b-card-header>
      <b-card-body class="pt-0">
        <b-row class="g-3">
          <b-col md="6" lg="6" v-for="(item, idx) in customerStats" :key="idx">
            <StatCard :item="item" />
          </b-col>
        </b-row>
        <div
          class="bg-primary-subtle p-2 border-dashed border-primary rounded mt-3"
        >
          <img src="" alt="" class="d-inline-block me-1" height="30" />{{ " " }}
          <span class="text-primary fw-semibold">Progresso </span>
          <span class="text-primary fw-normal">
            de dados podem variar conforme os lançamentos</span
          >
        </div>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { customerStats } from "../../team/components/analytics/data";
import StatCard from "../../team/components/analytics/StatCard.vue";
</script>
