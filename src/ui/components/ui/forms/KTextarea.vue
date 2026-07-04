<script setup lang="ts">
import { computed } from 'vue';
import { BFormTextarea } from 'bootstrap-vue-next';

interface Props {
  modelValue?: string | null;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number | string;
  rows?: number | string;
  error?: string;
  helper?: string;
  showCharCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  required: false,
  disabled: false,
  readonly: false,
  rows: 3,
  showCharCount: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const textareaId = computed(() => props.id || props.name || undefined);
</script>

<template>
  <div>
    <label v-if="label" class="form-label" :for="textareaId">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <BFormTextarea
      :id="textareaId"
      :name="name"
      :model-value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :state="error ? false : null"
      @update:model-value="emit('update:modelValue', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <div v-if="maxlength && showCharCount" class="form-text text-end">
      {{ String(modelValue ?? '').length }}/{{ maxlength }}
    </div>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    <div v-else-if="helper" class="form-text">{{ helper }}</div>
  </div>
</template>
