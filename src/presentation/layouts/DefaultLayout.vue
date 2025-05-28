<template>
  <TopBar />

  <LeftSideBar />

  <div class="page-wrapper">
    <div class="page-content">
      <div class="container-xxl">
        <slot />
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopBar from "@/presentation/layouts/components/TopBar.vue";
import LeftSideBar from "@/presentation/layouts/components/LeftSideBar.vue";
import Footer from "@/presentation/layouts/components/Footer.vue";
</script>
