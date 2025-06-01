<template>
  <Multiselect
      v-model="internalValue"
      :options="options"
      :placeholder="placeholder"
      :multiple="multiple"
      :searchable="true"
      :close-on-select="!multiple"
      :label="labelKey"
      :track-by="trackBy"
      selectLabel=""
      deselectLabel=""
      selectedLabel=""
      v-bind="$attrs"
      @select="$emit('change', $event)"
      @remove="$emit('remove', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export interface ISelect {
  id: number
  name: string
}

type Props = {
  modelValue: ISelect | null
  options: ISelect[]
  placeholder?: string
  multiple?: boolean
  labelKey?: string
  trackBy?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Selecione uma opção',
  multiple: false,
  labelKey: 'name',
  trackBy: 'id'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ISelect | null): void
  (e: 'change', payload: any): void
  (e: 'remove', payload: any): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<style lang="scss">
.multiselect__option--selected {
  font-weight: normal;
}

.multiselect, .multiselect__input, .multiselect__single {
  font-size: 12px !important;
}

.multiselect.error {
  border: 1px solid red
}
</style>
