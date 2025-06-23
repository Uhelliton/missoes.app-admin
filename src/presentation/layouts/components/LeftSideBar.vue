<template>
  <div class="startbar d-print-none" id="startbar">
    <div class="brand">
      <LogoBox />
    </div>
    <div class="startbar-menu">
      <simplebar class="startbar-collapse" id="startbarCollapse" data-simplebar>
        <div class="d-flex align-items-start flex-column w-100">
          <AppMenu :menu-items="getMenuItems()" />
          <div class="update-msg text-center position-absolute bottom-0" style="width: 85%; margin: 0 auto">
            <div
              class="d-flex justify-content-center align-items-center thumb-lg update-icon-box rounded-circle mx-auto"
            >
              <i
                class="iconoir-peace-hand h3 align-self-center mb-0 text-primary"
              ></i>
            </div>
            <p class="mb-3 text-muted">
             Acesso Rápido
            </p>
            <button @click="redirectToFactSheet" class="btn text-primary bg-black rounded-pill">Lançar Ficha</button>
          </div>
        </div>
      </simplebar>
    </div>
  </div>
  <div class="startbar-overlay d-print-none"></div>
</template>
.
<script setup lang="ts">
import simplebar from "simplebar-vue";
import { useRouter } from 'vue-router'
import { getMenuItems } from "@/infra/helpers/menu";
import LogoBox from "@/components/LogoBox.vue";

const router = useRouter()

const redirectToFactSheet = () => {
  router.push({ name: 'evangelism.factsheet' })
}
</script>
