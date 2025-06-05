<template>
  <BModal
    v-model="isOpen"
    :title="isFormCreate ? 'Cadastro de Igreja' : 'Editar Igreja'"
    title-class="m-0"
    size="lg"
    cancel-variant="outline-danger"
    @close="closeModal"
  >
    <BForm class="px-4 mt-2">
      <BRow>
        <BCol md="6">
          <BFormGroup label="Name" label-for="Nome" class="mb-3">
            <BFormInput type="text" v-model="form.name" :class="[{ error: v$.name.$error }]" />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Email" label-for="Email" class="mb-3">
            <BFormInput type="text" v-model="form.email" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="6">
          <BFormGroup label="CNPJ" label-for="Cpf" class="mb-3">
            <BFormInput type="text" v-model="form.cnpj"  v-maska="'##.###.###/####-##'"  :class="[{ error: v$.cnpj.$error }]" />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Telefone" label-for="Telefone" class="mb-3">
            <BFormInput type="text" v-model="form.phoneNumber" v-maska="'(##) #####-####'" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow class="mt-2">
        <BCol md="6">
          <BFormGroup label="Estado" label-for="" class="mb-3 error">
            <AppSelect
              v-model="form.select.state"
              :options="states"
              @change="onChangeState"
              :class="[{ error: v$.select.state.$error }]"
            />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Cidade" label-for="" class="mb-3">
            <AppSelect
              v-model="form.select.city"
              :options="cities"
              :class="[{ error: v$.select.city.$error }]"
              :disabled="!form.select.state"
              @change="(option) => (form.cityId = option.id)"
            />
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>

    <template #ok>
      <b-button type="button" variant="primary" @click="handleSubmit">Confirmar</b-button>
    </template>
    <template #cancel>
      <b-button variant="outline-secondary" @click="closeModal">Cancelar</b-button>
    </template>
  </BModal>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch, computed } from 'vue'
import AppSelect, { type ISelect } from '@/components/forms/Select.vue'
import { LocationService } from '@/modules/location/services/location.service'
import { ChurchService } from '@/modules/project/services/church.service'
import type { IChurch } from '@/modules/project/types/church.interface'
import { vMaska } from 'maska/vue'
import { useVuelidate } from '@vuelidate/core'
import { locationDefault } from '@/infra/helpers/constants'
import { useNotify } from '@/infra/composables/useNotify'
import { useFormChurch } from '@/modules/project/composables'

interface IModalProps {
  isOpen: boolean
  church?: IChurch
}

interface IModalEmits {
  (event: 'update:isOpen', value: boolean): void
  (event: 'close'): void
  (event: 'created', value: boolean): void
}

const props = defineProps<IModalProps>()
const emit = defineEmits<IModalEmits>()

const locationService = LocationService()
const churchService = ChurchService()
const { form, setFormData, resetForm, rules } = useFormChurch()
const notify = useNotify()

const { isOpen, church } = toRefs(props)
const states = ref([])
const cities = ref([])
const churches = ref([])
const v$ = useVuelidate(rules, form)

onMounted(async () => {
  await fetchStates()
  await fetchCities(locationDefault.state.id)
})

const isFormCreate = computed(() => !church.value)

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value && !isFormCreate.value) {
      setFormData(church.value)
      return
    }

    resetForm()
  },
)

const fetchStates = async () => {
  states.value = await locationService.getStates()
}

const fetchCities = async (stateId: number) => {
  cities.value = await locationService.getCities(stateId)
}

const onChangeState = async (option: ISelect) => {
  form.stateId = option.id
  form.cityId = 0
  form.select.city = {}
  await fetchCities(option.id)
}

const handleSubmit = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  await createOrUpdateRecord()
}

const createOrUpdateRecord = async () => {
  try {
    const payload = { ...form }
    delete payload.stateId
    delete payload.select

    if (isFormCreate.value) {
      await churchService.create(payload)
      notify.success('Cadastro efetivado com sucesso!')
    } else {
      await churchService.update(church.value.id, payload)
      notify.success('Cadastro atualizado com sucesso!')
    }

    closeModal()
    emit('created', true)
  } catch (error) {
    const message = error.response?.data?.message
    notify.httpError(message)
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>
