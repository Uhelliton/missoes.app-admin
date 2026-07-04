<template>
  <label v-if="label" :for="id" class="form-label text-muted">
    {{ label }}
  </label>

  <select ref="selectRef" :id="id" :value="modelValue" @change="updateValue" v-bind="$attrs">
    <slot />
    <template v-if="options">
      <option v-for="(option, idx) in options" :key="idx" :value="option.value">
        {{ option.text }}
      </option>
    </template>
  </select>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type Choices from 'choices.js'

type ChoicesSelectPropsType = {
  id: string
  label?: string
  modelValue?: string | number
  options?: { value: string | number; text: string }[]
  choiceOptions?: object
}

const props = defineProps<ChoicesSelectPropsType>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const selectRef = ref<HTMLSelectElement | null>(null)
let choicesInstance: Choices | null = null

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}

onMounted(async () => {
  const ChoicesLib = (await import('choices.js')).default

  if (selectRef.value) {
    choicesInstance = new ChoicesLib(selectRef.value, {
      ...props.choiceOptions,
    })
  }
})

watch(
  () => props.modelValue,
  (val) => {
    if (choicesInstance && val !== undefined) {
      choicesInstance.setChoiceByValue(String(val))
    }
  }
)

onBeforeUnmount(() => {
  choicesInstance?.destroy()
})
</script>
