<script setup lang="ts">
import { computed } from 'vue';
import { BFormRadio } from 'bootstrap-vue-next';

interface Props {
  modelValue?: string | number | boolean | null;
  value?: string | number | boolean;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean | null];
  change: [value: string | number | boolean | null];
}>();

const radioId = computed(
  () => props.id || (props.name && props.value != null ? `${props.name}-${props.value}` : undefined),
);

const onUpdate = (value: string | number | boolean | null) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <BFormRadio
    :id="radioId"
    :name="name"
    :model-value="modelValue"
    :value="value"
    :disabled="disabled"
    :state="error ? false : null"
    @update:model-value="onUpdate"
  >
    <template v-if="label">{{ label }}</template>
    <slot v-else />
  </BFormRadio>
</template>