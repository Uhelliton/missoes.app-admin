<script setup lang="ts">
import { computed, ref } from 'vue';
import { BFormInput } from 'bootstrap-vue-next';

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
  error?: string;
  helper?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Digite sua senha',
  required: false,
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | null];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputId = computed(() => props.id || props.name || undefined);
const showPassword = ref(false);
</script>

<template>
  <div>
    <label v-if="label" class="form-label" :for="inputId">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <div class="input-group">
      <BFormInput
        :id="inputId"
        :name="name"
        :type="showPassword ? 'text' : 'password'"
        :model-value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :state="error ? false : null"
        @update:model-value="emit('update:modelValue', $event)"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
      <button
        type="button"
        class="btn btn-outline-secondary"
        :disabled="disabled"
        @click="showPassword = !showPassword"
      >
        <i :class="showPassword ? 'ki-filled ki-eye-slash' : 'ki-filled ki-eye'"></i>
      </button>
    </div>
    <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    <div v-else-if="helper" class="form-text">{{ helper }}</div>
  </div>
</template>