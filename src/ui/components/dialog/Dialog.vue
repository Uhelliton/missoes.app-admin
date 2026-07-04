<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  id: string;
  title?: string;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: '400px'
})

const closeModal = () => {
  const modalEl = document.querySelector(`#${props.id}`);
  if (modalEl && (window as any).KTModal) {
    const modal = (window as any).KTModal.getInstance(modalEl);
    if (modal) {
      modal.hide();
    }
  }
}
</script>

<template>
  <div
    class="kt-modal kt-modal-fit kt-modal-center"
    :style="{ maxWidth: props.maxWidth }"
    data-kt-modal="true"
    data-kt-modal-backdrop="true"
    data-kt-modal-persistent="true"
    :id="id"
  >
    <div class="kt-modal-content modal-offset-top">
      <div class="modal-content">

        <!-- header -->
        <div class="kt-modal-header">
          <h3 class="kt-modal-title">{{ title }}</h3>
          <button
            type="button"
            class="kt-modal-close"
            aria-label="Close modal"
            @click="closeModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-x"
              aria-hidden="true"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <!-- body -->
        <div class="kt-modal-body">
          <slot />
        </div>

        <!-- footer -->
        <div class="modal-footer">
          <slot name="footer" />
        </div>

      </div>
    </div>
  </div>
</template>
