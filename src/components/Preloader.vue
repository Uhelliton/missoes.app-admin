<!-- components/Preloader.vue -->
<template>
  <div v-if="loading" class="preloader-overlay">
    <div class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-3">Processando informações...</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean
})
</script>

<style scoped>
.preloader-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); /* fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* acima de modais e conteúdo */
}
</style>
