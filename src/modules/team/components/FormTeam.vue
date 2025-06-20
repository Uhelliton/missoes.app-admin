<template>
  <BModal
    v-model="isOpen"
    :title="isFormCreate ? 'Cadastro de Equipe' : 'Editar Equipe'"
    title-class="m-0"
    size="lg"
    cancel-variant="outline-danger"
    @close="closeModal"
  >
    <BForm class="px-4 mt-2">
      <BRow>
        <BCol md="6">
          <BFormGroup label="Name" label-for="Nome" class="mb-3">
            <BFormInput
              type="text"
              v-model="form.name"
              placeholder="ex: Equipe Azul"
              :class="[{ error: v$.name.$error }]"
            />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Cor" class="mb-3">
            <BFormSelect
              class="form-control"
              v-model="form.color"
              placeholder="Selecione uma opção"
              :class="[{ error: v$.color.$error }]"
            >
              <option v-for="color in colors" :value="color" :key="color">{{ color }}</option>
              <template #first>
                <option disabled value="">Selecione uma opção</option>
              </template>
            </BFormSelect>
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="6">
          <BFormGroup label="Lider" label-for="" class="mb-3">
            <AppSelect
              v-model="form.select.leader"
              :options="members"
              :class="[{ error: v$.select.leader.$error }]"
              @change="(option) => (form.leaderId = option.id)"
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
import { MemberService } from '@/modules/team/services/member.service'
import { TeamService } from '@/modules/team/services/team.service'
import { useVuelidate } from '@vuelidate/core'
import { useNotify } from '@/infra/composables/useNotify'
import { useFormTeam } from '@/modules/team/composables/useFormTeam'
import type { ITeam } from '@/modules/team/types/team.interface'
import { colors } from '@/infra/helpers/constants'
import { wait } from '@/infra/helpers/helper'

interface IModalProps {
  isOpen: boolean
  team?: ITeam
}

interface IModalEmits {
  (event: 'update:isOpen', value: boolean): void
  (event: 'close'): void
  (event: 'created', value: boolean): void
}

const props = defineProps<IModalProps>()
const emit = defineEmits<IModalEmits>()

const memberService = MemberService()
const teamService = TeamService()
const { form, setFormData, resetForm, rules } = useFormTeam()
const notify = useNotify()

const { isOpen, team } = toRefs(props)
const members = ref([])
const v$ = useVuelidate(rules, form)
const isLoading = ref(false)

onMounted(async () => {
  await fetchMembers()
})

const isFormCreate = computed(() => !team.value)

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value && !isFormCreate.value) {
      setFormData(team.value)
      return
    }

    resetForm()
  },
)

const fetchMembers = async () => {
  const response = await memberService.getAll({ limit: 500 })
  members.value = response.data.items
}

const handleSubmit = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  await createOrUpdateRecord()
}

const createOrUpdateRecord = async () => {
  try {
    isLoading.value = true
    const payload = { ...form }
    delete payload.select

    if (isFormCreate.value) {
      await teamService.create(payload)
      notify.success('Cadastro efetivado com sucesso!')
    } else {
      await teamService.update(team.value.id, payload)
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
