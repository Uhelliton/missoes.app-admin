<template>
  <BModal
    v-model="isOpen"
    :title="isFormCreate ? 'Lançamento de ficha de evangelismo' : ' Editar ficha de evangelismo'"
    title-class="m-0"
    size="xl"
    cancel-variant="outline-danger"
    @close="closeModal"
  >
    <BForm class="px-4 mt-2">
      <BRow>
        <BCol md="2">
          <BFormGroup label="Código" label-for="code" class="mb-3">
            <BFormInput
              type="text"
              v-model="form.code"
              placeholder="Ex: AZ-1234"
              v-maska="'@@-#######'"
              :class="['text-uppercase', { error: v$.code.$error }]"
              @focusout="handleFocusFieldCode"
              :readonly="!isFormCreate"
            />
          </BFormGroup>
        </BCol>
        <BCol md="3">
          <BFormGroup label="Data Evangelismo" label-for="" class="mb-3">
            <BFormInput
              type="text"
              v-model="form.evangelizedAt"
              placeholder="00/00/0000"
              v-maska="'##/##/####'"
              :class="[{ error: v$.evangelizedAt.$error }]"
            />
          </BFormGroup>
        </BCol>
        <BCol md="7">
          <BFormGroup label="Nome" label-for="Nome" class="mb-3">
            <BFormInput type="text" v-model="form.name" :class="[{ error: v$.name.$error }]" />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="6">
          <BFormGroup label="Endereço" label-for="address" class="mb-3">
            <BFormInput
              type="text"
              v-model="form.recordAddress.street"
              :class="[{ error: v$.recordAddress.street.$error }]"
            />
          </BFormGroup>
        </BCol>
        <BCol md="2">
          <BFormGroup label="Nº" label-for="number" class="mb-3">
            <BFormInput type="text" v-model="form.recordAddress.number" :class="[{ error: v$.recordAddress.number.$error }]" />
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Referêcia" label-for="address" class="mb-3">
            <BFormInput
              type="text"
              v-model="form.recordAddress.reference"
            />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="8">
          <BFormGroup label="Outras Pessoas na Casa"  label-for="address" class="mb-3">
            <BFormTags
              type="text"
              v-model="form.additionalPeople"
              tag-variant="secondary"
              tag-pills
              size="lg"
              placeholder=""
            />
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Bairro" label-for="district" class="mb-3">
            <AppSelect
              v-model="form.select.district"
              :options="districts"
              :class="[{ error: v$.select.district.$error }]"
              @change="(option) => (form.recordAddress.districtId = option.id)"
            />
          </BFormGroup>
        </BCol>
      </BRow>
      <BRow>
        <BCol md="4">
          <BFormGroup label="Classificação" label-for="Sexo" class="mb-3">
            <BFormSelect
              v-model="form.ageCategory"
              class="form-control"
              placeholder="Selecione uma opção"
              :class="[{ error: v$.ageCategory.$error }]"
            >
              <option value="Criança">Criança</option>
              <option value="Adolescente">Adolescente</option>
              <option value="Jovem">Jovem</option>
              <option value="Adulto">Adulto</option>
              <template #first>
                <option disabled value="">Selecione uma opção</option>
              </template>
            </BFormSelect>
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
      <BRow>
        <BCol md="5">
          <BFormGroup label="Decisões" label-for="decision" class="mb-3">
            <b-form-checkbox v-model="form.acceptedCourse" size="lg" inline><small>Curso</small></b-form-checkbox>
            <b-form-checkbox  v-model="form.acceptedCell" size="lg" inline><small>Célula</small></b-form-checkbox>
            <b-form-checkbox  v-model="form.madeDecision" size="lg" inline><small>Aceitou Jesus</small></b-form-checkbox>
          </BFormGroup>
        </BCol>
        <BCol md="3">
          <BFormGroup label="Equipe" label-for="district" class="mb-3">
            <AppSelect
              v-model="form.select.team"
              :options="teamsListCompact"
              :class="[{ error: v$.select.team.$error }]"
              @change="onChangeTeam"
            />
          </BFormGroup>
        </BCol>
        <BCol md="4">
          <BFormGroup label="Evangelistas" label-for="district" class="mb-3">
            <AppSelect
              v-model="form.select.members"
              :options="members"
              :class="[{ error: v$.select.members.$error }]"
              multiple
            />
          </BFormGroup>
        </BCol>
      </BRow>

      <BRow class="mt-2">
        <BCol md="12">
          <BFormGroup label="Observação" label-for="" class="mb-3">
             <BFormTextarea v-model="form.notes" rows="3" />
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
import { TeamService } from '@/modules/team/services/team.service'
import { ProjectService } from '@/modules/project/services/project.service'
import { EvangelismRecordService } from '@/modules/evangelism/services/evangelism-record.service'
import { vMaska } from 'maska/vue'
import { useVuelidate } from '@vuelidate/core'
import { useNotify } from '@/infra/composables/useNotify'
import { useFormFactSheet } from '@/modules/evangelism/composables/useFormFactsheet'
import { isValidISODate, parseDateBrToDefaultFormat } from '@/infra/helpers/helper'
import { wait } from '@/infra/helpers/helper'
import type {IEvangelismRecord} from "@/modules/evangelism/types/evangelism-record.interface";
import type {IProject} from "@/modules/project/types/project.interface";
import type {ITeam} from "@/modules/team/types/team.interface";
import type {IMemberSimplified} from "@/modules/team/types/member.interface";

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

const projectService = ProjectService()
const teamService = TeamService()
const evangelismRecordService = EvangelismRecordService()

const { form, setFormData, resetForm, rules } = useFormFactSheet()
const notify = useNotify()

const { isOpen, evangelismRecord } = toRefs(props)
const teams = ref<Array<ITeam>>([])
const members = ref<Array<IMemberSimplified>>([])
const project = ref<IProject>()
const v$ = useVuelidate(rules, form)
const isLoading = ref(false)

onMounted(async () => {
  await fetchProject()
  await fetchTeams()
})

const isFormCreate = computed(() => !evangelismRecord.value)
const districts = computed(() => project.value?.city.districts ?? [])
const teamsListCompact = computed(() => teams.value.map(({ members, leader, ...team }) => team ) ?? [])

watch(
  () => isOpen.value,
  (value: boolean) => {
    if (value && !isFormCreate.value) {
      setFormData(evangelismRecord.value)
      return
    }

    resetForm()
    form.evangelizedAt = new Date().toLocaleDateString('pt-BR')
  },
)


const fetchProject = async () => {
  const response = await projectService.getProjectActive()
  project.value = response.data

  form.projectId = project.value?.id
  form.recordAddress.cityId = project.value?.city.id
}

const fetchTeams = async () => {
  const { data } = await teamService.getAll({ limit: 100 })
  teams.value = data?.items ?? []
}

const onChangeTeam = (option: ITeam) => {
  const team = teams.value.find((team) => team.id === option.id)
  form.membersIds = []
  form.teamId = option.id
  members.value = team.members
}

const handleFocusFieldCode = (event: any) => {
  const code = event.target.value
  const [fist, last] = code.split('-')
  const teamFiltered = teams.value.find((team) => team.name.toLowerCase().includes(fist))
  console.log(teamFiltered)

  if (teamFiltered) {
    const { members: teamMembers, leader, ...team } = teamFiltered
    form.select.team = team
    form.teamId = team.id
    members.value = teamMembers
  }
}

const handleSubmit = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  await createOrUpdateRecord()
  v$.value.$reset()
}

const createOrUpdateRecord = async () => {
  const evangelizedAt = parseDateBrToDefaultFormat(form.evangelizedAt)
  if (!isValidISODate(evangelizedAt)) {
    notify.warning('Preencha uma data válida!')
    return
  }

  try {
    isLoading.value = true
    const payload = {
      ...form,
      code: form.code.toUpperCase(),
      membersIds: form.select.members.map(({ id }) => id),
      evangelizedAt: evangelizedAt,
      projectId: project.value?.id
    }
    delete payload.select

    if (isFormCreate.value) {
      await evangelismRecordService.create(payload)
      notify.success('Cadastro efetivado com sucesso!')
    } else {
      await evangelismRecordService.update(evangelismRecord.value.id, payload)
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
