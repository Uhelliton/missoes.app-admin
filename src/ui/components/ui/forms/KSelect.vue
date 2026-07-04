<script setup lang="ts">
import { computed } from 'vue';
import { BFormSelect } from 'bootstrap-vue-next';

interface SelectOption {
  [key: string]: unknown;
  value?: string | number;
  label?: string;
}

interface Props {
  modelValue?: string | number | null;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options?: SelectOption[] | string[] | number[];
  /** Chave usada como value quando as opções não seguem { value, label }. */
  optionValue?: string;
  /** Chave usada como label quando as opções não seguem { value, label }. */
  optionLabel?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Selecione',
  options: () => [],
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
  change: [value: string | number | null];
}>();

const selectId = computed(() => props.id || props.name || undefined);

/** Normaliza primitivas e objetos para o formato { value, label }. */
const normalizedOptions = computed(() =>
  (props.options as Array<SelectOption | string | number>).map((opt) => {
    if (typeof opt !== 'object' || opt === null) {
      return { value: opt, label: String(opt) };
    }
    const value = props.optionValue ? opt[props.optionValue] : opt.value ?? opt.id;
    const label = props.optionLabel ? opt[props.optionLabel] : opt.label ?? opt.text ?? opt.name;
    return { value: value as string | number, label: String(label ?? value) };
  }),
);

const onUpdate = (value: string | number | null) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <div>
    <label v-if="label" class="form-label" :for="selectId">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <BFormSelect
      :id="selectId"
      :name="name"
      :model-value="modelValue"
      :disabled="disabled"
      :state="error ? false : null"
      @update:model-value="onUpdate"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in normalizedOptions" :key="String(opt.value)" :value="opt.value">
        {{ opt.label }}
      </option>
    </BFormSelect>
    <div v-if="helper" class="form-text">{{ helper }}</div>
  </div>
</template>
