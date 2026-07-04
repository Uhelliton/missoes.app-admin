<script setup lang="ts">
import { computed } from 'vue';
import { BFormInput } from 'bootstrap-vue-next';
import { vMaska } from 'maska/vue';

interface Props {
  modelValue?: string | number | null;
  type?: string;
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
  /** Máscara aplicada via maska (ex.: '###.###.###-##' ou lista para máscara dinâmica). */
  mask?: string | string[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
}>();

const inputId = computed(() => props.id || props.name || undefined);

const inputAttrs = computed(() => ({
  id: inputId.value,
  name: props.name,
  type: props.type,
  placeholder: props.placeholder,
  disabled: props.disabled,
  readonly: props.readonly,
  maxlength: props.maxlength,
  state: props.error ? false : null,
  modelValue: props.modelValue,
}));
</script>

<template>
  <div>
    <label v-if="label" class="form-label" :for="inputId">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    <BFormInput
      v-if="mask"
      v-maska="mask"
      v-bind="inputAttrs"
      @update:model-value="emit('update:modelValue', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <BFormInput
      v-else
      v-bind="inputAttrs"
      @update:model-value="emit('update:modelValue', $event)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    />
    <!--
     <div v-if="error" class="invalid-feedback d-block">{{ error }}</div>
    -->
    <div v-if="helper" class="form-text">{{ helper }}</div>
  </div>
</template>
