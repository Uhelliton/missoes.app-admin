<script setup lang="ts">
import { computed } from 'vue';
import { BFormCheckbox } from 'bootstrap-vue-next';

interface Props {
  modelValue?: boolean;
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const switchId = computed(() => props.id || props.name || undefined);

const onUpdate = (value: boolean | unknown[]) => {
  const checked = Boolean(value);
  emit('update:modelValue', checked);
  emit('change', checked);
};
</script>

<template>
  <BFormCheckbox
    :id="switchId"
    :name="name"
    :model-value="modelValue"
    :disabled="disabled"
    switch
    @update:model-value="onUpdate"
  >
    <template v-if="label">{{ label }}</template>
    <slot v-else />
  </BFormCheckbox>
</template>