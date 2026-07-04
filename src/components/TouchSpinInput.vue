<template>
  <div class="input-group" :class="className" data-touchspin>
    <!-- Vertical mode -->
    <template v-if="vertical">
      <div class="btn-group-vertical">
        <button type="button" class="btn" :class="buttonClassName" :disabled="disabled || localValue <= min" @click="decrement">
          <Icon icon="plus" />
        </button>

        <button type="button" class="btn" :class="buttonClassName2" :disabled="disabled || localValue >= max" @click="increment">
          <Icon icon="minus" />
        </button>
      </div>

      <BFormInput type="number" :class="[inputClassName, size]" :min="min" :max="max" v-model="localValue" :readonly="readOnly" :disabled="disabled" @input="handleInput" />
    </template>

    <!-- Horizontal -->
    <template v-else>
      <button type="button" class="btn" :class="[buttonClassName, `btn-${variant}`]" :disabled="disabled || localValue <= min" @click="decrement">
        <Icon icon="minus" />
      </button>

      <BFormInput type="number" class="form-control" :class="[inputClassName, size]" :min="min" :max="max" v-model="localValue" :readonly="readOnly" :disabled="disabled" @input="handleInput" />

      <button type="button" class="btn" :class="[buttonClassName, `btn-${variant}`]" :disabled="disabled || localValue >= max" @click="increment">
        <Icon icon="plus" />
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BFormInput } from 'bootstrap-vue-next'
import { ref, watch } from 'vue'
import Icon from './wrappers/Icon.vue'

type Props = {
  min?: number
  max?: number
  modelValue?: number
  className?: string
  inputClassName?: string
  buttonClassName?: string
  buttonClassName2?: string
  variant?: string
  size?: 'sm' | 'lg' | string
  vertical?: boolean
  readOnly?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  modelValue: 0,
  variant: 'light',
  vertical: false,
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref<number>(props.modelValue)

// Sync outer → inner
watch(
  () => props.modelValue,
  (v) => {
    if (v !== localValue.value) localValue.value = v
  }
)

// Sync inner → outer
watch(localValue, (v) => emit('update:modelValue', v))

const increment = () => {
  if (!props.readOnly && localValue.value < props.max) {
    localValue.value++
  }
}

const decrement = () => {
  if (!props.readOnly && localValue.value > props.min) {
    localValue.value--
  }
}

const handleInput = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  if (val === '') {
    localValue.value = props.min
    return
  }
  const num = parseInt(val)
  if (isNaN(num)) return
  localValue.value = Math.min(props.max, Math.max(props.min, num))
}
</script>
