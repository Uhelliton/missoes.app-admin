<template>
  <BModal
    v-model="isOpen"
    :title="isFormCreate ? 'Lançamento de ficha de evangelismo' : ' Editar ficha de evangelismo'"
    title-class="m-0"
    size="lg"
    cancel-variant="outline-danger"
    @close="closeModal"
  >
    <BForm class="px-4 mt-2">
      <BRow>
        <BCol md="4">
          <BFormGroup label="Código" label-for="code" class="mb-3">
            <BFormInput type="text" v-model="form.code" :class="[{ error: v$.code.$error }]" />
          </BFormGroup>
        </BCol>
        <BCol md="8">
          <BFormGroup label="Name" label-for="Nome" class="mb-3">
            <BFormInput type="text" v-model="form.name" :class="[{ error: v$.name.$error }]" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="4">
          <BFormGroup label="Idade" label-for="age" class="mb-3">
            <BFormInput type="text" v-model="form.age" :class="[{ error: v$.age.$error }]" v-maska="'###.###.###-##'" />
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Telefone" label-for="Telefone" class="mb-3">
            <BFormInput type="text" v-model="form.phoneNumber" v-maska="'(##) #####-####'" />
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Sexo" label-for="Sexo" class="mb-3">
            <BFormSelect
              v-model="form.gender"
              class="form-control"
              placeholder="Selecione uma opção"
              :class="[{ error: v$.gender.$error }]"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <template #first>
                <option disabled value="">Selecione uma opção</option>
              </template>
            </BFormSelect>
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow class="mt-2">
        <BCol md="8">
          <BFormGroup label="Decisões" label-for="" class="mb-3">
          <b-form-checkbox v-model="form.acceptedCourse" size="lg" inline><small>Curso</small></b-form-checkbox> {{ " " }}
          <b-form-checkbox  v-model="form.acceptedCell" size="lg" inline><small>Célula</small></b-form-checkbox> {{ " " }}
          <b-form-checkbox  v-model="form.madeDecision" size="lg" inline><small>Aceitou Jesus</small></b-form-checkbox>
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Bairro" label-for="" class="mb-3">
            <AppSelect
              v-model="form.select.district"
              :options="cities"
              :class="[{ error: v$.select.district.$error }]"
              multiple=""
              @change="(option) => (form.recordAddress.districtId = option.id)"
            />
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>

    <template #ok>
      <b-button type="button" variant="primary" @click="handleSubmit" :disabled="isLoading">
        <b-spinner small v-if="isLoading" />
        {{ isLoading ? 'Salvando...' : 'Confimar' }}
      </b-button>
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
import { MemberService } from '@/modules/team/services/member.service'
import { vMaska } from 'maska/vue'
import { useVuelidate } from '@vuelidate/core'
import { locationDefault } from '@/infra/helpers/constants'
import { useNotify } from '@/infra/composables/useNotify'
import { useFormFactSheet } from '@/modules/evangelism/composables/useFormFactsheet'
import { isValidISODate, numberOnly, parseDateBrToDefaultFormat } from '@/infra/helpers/helper'
import { wait } from '@/infra/helpers/helper'
import type {IEvangelismRecord} from "@/modules/evangelism/types/evangelism-record.interface";

interface IModalProps {
  isOpen: boolean
  evangelismRecord?: IEvangelismRecord
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
const memberService = MemberService()
const { form, setFormData, resetForm, rules } = useFormFactSheet()
const notify = useNotify()

const { isOpen, evangelismRecord } = toRefs(props)
const states = ref([])
const cities = ref([])
const churches = ref([])
const v$ = useVuelidate(rules, form)
const isLoading = ref(false)

onMounted(async () => {
  await fetchStates()
  await fetchCities(locationDefault.state.id)
  await fetchChurches()
})

const isFormCreate = computed(() => !evangelismRecord.value)

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value && !isFormCreate.value) {
      setFormData(evangelismRecord.value)
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

const fetchChurches = async () => {
  const response = await churchService.getAll()
  churches.value = response.data.items
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
  const birthdayFormat = parseDateBrToDefaultFormat(form.birthday)
  if (!isValidISODate(birthdayFormat)) {
    notify.warning('Preencha uma data válida!')
    return
  }

  try {
    isLoading.value = true
    const payload = {
      ...form,
      cpf: numberOnly(form.cpf),
      birthday: birthdayFormat,
    }
    delete payload.stateId
    delete payload.select

    if (isFormCreate.value) {
      await memberService.create(payload)
      notify.success('Cadastro efetivado com sucesso!')
    } else {
      await memberService.update(evangelismRecord.value.id, payload)
      notify.success('Cadastro atualizado com sucesso!')
    }

    await wait()
    closeModal()
    emit('created', true)
  } catch (error) {
    const message = error.response?.data?.message
    notify.httpError(message)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  emit('update:isOpen', false)
  emit('close')
}
</script>
