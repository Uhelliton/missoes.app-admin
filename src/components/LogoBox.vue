<template>
  <router-link to="/dashboard" class="logo">
    <span>
      <img :src="logoSm" alt="logo-small" class="logo-sm" style="margin-top: -5px" />{{ " " }}
    </span>
    <span class=" pt-4">
      <span class="logo-lg text-white" style="font-size: 1.5em;">Missões</span>
    </span>
  </router-link>
</template>
<script setup lang="ts">
import logoSm from "@/assets/images/logo-sm.png";
import logoLight from "@/assets/images/logo-light.png";
import logoDark from "@/assets/images/logo-dark.png";
</script>
