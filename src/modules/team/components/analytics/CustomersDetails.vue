<template>
  <b-row>
    <b-col cols="12">
      <UIComponentCard title="Fichas de Evangelismo">
        <b-table-simple responsive class="mb-0">
          <b-thead class="table-light">
            <b-tr>
              <b-th>Ficha Nº</b-th>
              <b-th>Nome</b-th>
              <b-th>Cidade</b-th>
              <b-th>Bairro</b-th>
              <b-th>Evangelizados</b-th>
              <b-th>Evangelizado Por</b-th>
              <b-th>Data</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="(item, idx) in 10" :key="idx">
              <b-td>AZ-000 {{ idx}}</b-td>
              <b-td>
                João Silva Santos
              </b-td>
              <b-td>Porto Seguro</b-td>
              <b-td>Frei Calixto</b-td>
              <b-td>{{ 2 + idx}}</b-td>
              <b-td>Vilson Santos, Felipe Santos</b-td>
              <b-td>{{ idx +1 }}/07/2025</b-td>
              <b-td>
                <button class="btn btn-sm btn-outline-light mx-2" title="Editar Equipe">
                  <span class="d-flex justify-content-center align-items-center">
                    <i class="iconoir-eye-solid text-secondary fs-16"></i>
                  </span>
                </button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </UIComponentCard>
    </b-col>
  </b-row>
</template>
<script setup lang="ts">
import UIComponentCard from "@/components/UIComponentCard.vue";
import { customerTableData } from "@/views/apps/analytics/customers/components/data";
</script>
