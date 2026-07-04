<script setup lang="ts">
import { computed } from 'vue';
import { BFormCheckbox } from 'bootstrap-vue-next';

interface Props {
  modelValue?: boolean;
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  required: false,
  disabled: false,
  name: ''
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [value: boolean];
}>();

const checkboxId = computed(() => props.id || props.name || undefined);

const onUpdate = (value: boolean | unknown[]) => {
  const checked = Boolean(value);
  emit('update:modelValue', checked);
  emit('change', checked);
};
</script>

<template>
  <div>
    <BFormCheckbox
      :id="checkboxId"
      :name="name"
      :model-value="modelValue"
      :disabled="disabled"
      :state="error ? false : null"
      @update:model-value="onUpdate"
    >
      <template v-if="label">
        {{ label }} <span v-if="required" class="text-danger">*</span>
      </template>
      <slot v-else />
    </BFormCheckbox>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
  </div>
</template>
