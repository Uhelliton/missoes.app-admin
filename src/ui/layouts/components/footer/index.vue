<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 text-center text-md-start">
          {{ currentYear }}
          © {{ META_DATA.name }}
        </div>
        <div class="col-md-6">
          <div class="d-none d-md-flex justify-content-end gap-3">
            <a href="https://wa.me/5573988185493" target="_blank" class="link-reset">Support</a>
<!--            <RouterLink to="https://wa.me/5573988185493" target="_blank" class="link-reset">Support</RouterLink>-->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { currentYear, META_DATA } from '~/ui/config/constants'
</script>
