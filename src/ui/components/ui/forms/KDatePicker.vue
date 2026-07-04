<script setup lang="ts">
import { computed } from 'vue';
import FlatPickr from 'vue-flatpickr-component';

interface Props {
  modelValue?: string | null;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
  /** Configuração extra do flatpickr (mesclada sobre a padrão). */
  config?: Record<string, unknown>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Selecione uma data',
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
  change: [value: string | null];
}>();

const inputId = computed(() => props.id || props.name || undefined);

const pickerConfig = computed(() => ({
  dateFormat: 'Y-m-d',
  allowInput: true,
  ...props.config,
}));

const onUpdate = (value: string | null) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <div>
    <label v-if="label" class="form-label" :for="inputId">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <FlatPickr
      :id="inputId"
      :model-value="modelValue"
      class="form-control"
      :class="{ 'is-invalid': !!error }"
      :config="pickerConfig"
      :placeholder="placeholder"
      :disabled="disabled"
      @update:model-value="onUpdate"
    />
    <div v-if="helper" class="form-text">{{ helper }}</div>
  </div>
</template>
