<template>
  <router-link to="/" class="logo">
    <span>
      <img :src="logoSm" alt="logo-small" class="logo-sm" />{{ " " }}
    </span>
    <span class="">
      <h4 class="logo-lg text-black logo-dark">Missões</h4>
    </span>
  </router-link>
</template>
<script setup lang="ts">
import logoSm from "@/assets/images/logo-sm.png";
import logoLight from "@/assets/images/logo-light.png";
import logoDark from "@/assets/images/logo-dark.png";
</script>
