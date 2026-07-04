<template>
  <div class="wrapper">
    <Topbar />

    <MobileMenu v-if="isMobile || layout.sidenavSize === 'offcanvas'" />
    <Sidenav v-else />

    <div class="content-page">
      <BContainer fluid>
        <slot />
      </BContainer>
      <Footer />
    </div>


      <Customizer />

  </div>
</template>

<script setup lang="ts">
import Topbar from '~/ui/layouts/components/topbar/index.vue'
import Sidenav from '~/ui/layouts/components/sidenav/index.vue'
import MobileMenu from '~/ui/layouts/components/mobile-menu/index.vue'
import Customizer from '~/ui/layouts/components/customizer/index.vue'
import Footer from '~/ui/layouts/components/footer/index.vue'

import { storeToRefs } from 'pinia'
import { useLayout } from '~/stores/layout'
import { useMobile } from '~/infra/composables/useMobile.ts'

const { isMobile } = useMobile()
const layoutStore = useLayout()
const { layout } = storeToRefs(layoutStore)
</script>
