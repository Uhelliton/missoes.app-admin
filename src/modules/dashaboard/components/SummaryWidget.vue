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
          <b-col md="6" lg="6" v-for="(item, idx) in cardStats" :key="idx">
            <b-card no-body class="shadow-none border mb-3 mb-lg-0">
              <b-card-body>
                <b-row class="align-items-center">
                  <b-col class="text-center">
                    <i class="fs-24 align-self-center me-2" :class="item.icon"></i>
                    <span class="fs-30 fw-semibold">{{ item.stat }}</span>
                    <h6 class="text-uppercase text-muted mt-2 m-0">{{ item.title }}</h6>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import { BiEvangelismService } from '@/modules/dashaboard/services/bi-evangelism.service'
import type {ISummaryData} from "@/modules/dashaboard/types/bi-evangelism.interface";

type CardStatType = {
  title: string;
  stat?: number;
  icon: string;
};

const biEvangelismService = BiEvangelismService()
const summaryData = ref<ISummaryData>()

onMounted(async () => {
  await fetchData()
})

const cardStats = computed((): Array<CardStatType> => {
  return [
    {
      title: 'Total Evangelizados',
      icon: 'iconoir-community text-secondary',
      stat: summaryData.value?.total ?? 0,
    },
    {
      title: 'Cursos',
      icon: 'iconoir-book-stack text-secondary',
      stat: summaryData.value?.courses ?? 0,
    },
    {
      title: 'Celulas',
      icon: 'iconoir-group text-secondary',
      stat: summaryData.value?.cells ?? 0,
    },
    {
      title: 'Conversões',
      icon: 'iconoir-user-star text-secondary',
      stat: summaryData.value?.decision ?? 0,
    },
  ]
})

const fetchData = async () => {
  const response = await biEvangelismService.getSummaryData()
  summaryData.value = response.data
}
</script>
