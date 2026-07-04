<script setup lang="ts">
import { BButton, BSpinner } from 'bootstrap-vue-next';
import type { ButtonVariant, Size } from 'bootstrap-vue-next';

interface Props {
  variant?: ButtonVariant;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <BButton
    :variant="variant"
    :size="size"
    :type="type"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <BSpinner v-if="loading" small class="me-2" />
    <slot />
  </BButton>
</template>