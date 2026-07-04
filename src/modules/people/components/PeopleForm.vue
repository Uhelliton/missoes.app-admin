<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { BCol, BModal, BRow, BTabs, BTab } from 'bootstrap-vue-next';

import {
  KInput,
  KSelect,
  KTextarea,
  KCheckbox,
  KDatePicker,
  KButton,
} from '@/ui/components';

import type {
  ILookupItem,
  IPeopleCreatePayload,
  IPeopleDetail,
} from '../interfaces/people.interface.ts';
import { stepData, StepType } from '../../../../theme-v2/src/views/admin/form/wizard/components/data.ts'
import Icon from '../../../../theme-v2/src/components/wrappers/Icon.vue'

const stepData: StepType[] = [
  {
    title: 'Dados pessoais',
    subtitle: 'Personal details',
    icon: 'user-circle',
  },
  {
    title: 'Dados eclesiásticos',
    subtitle: 'Select your course',
    icon: 'book',
  },
  {
    title: 'Endereço',
    subtitle: 'Where you live',
    icon: 'map-pin',
  },
]

const TAB_PERSONAL = 0;
const TAB_ECCLESIAL = 1;
const TAB_ADDRESS = 2;

/** Listas de apoio injetadas pelo componente pai (sem acesso a serviços aqui). */
const props = withDefaults(
  defineProps<{
    genders?: ILookupItem[];
    categories?: ILookupItem[];
    origins?: ILookupItem[];
    maritalStatuses?: ILookupItem[];
    educationLevels?: ILookupItem[];
    memberTypes?: ILookupItem[];
    positions?: ILookupItem[];
    ministries?: ILookupItem[];
    cities?: ILookupItem[];
    districts?: ILookupItem[];
    submitting?: boolean;
  }>(),
  {
    genders: () => [],
    categories: () => [],
    origins: () => [],
    maritalStatuses: () => [],
    educationLevels: () => [],
    memberTypes: () => [],
    positions: () => [],
    ministries: () => [],
    cities: () => [],
    districts: () => [],
    submitting: false,
  },
);

const emit = defineEmits<{
  /** Dispara o payload validado para o pai persistir (create/update). */
  submit: [payload: IPeopleCreatePayload, id: number | null];
  /** Avisa o pai que a cidade mudou para que ele carregue os bairros. */
  'city-change': [cityId: number];
}>();

const showModal = ref(false);
const isEditMode = ref(false);
const currentId = ref<number | null>(null);
const peopleTabIndex = ref(TAB_PERSONAL);
const activeTabIndex = ref(0)
const selectedCityId = ref<number | null>(null);
const cityError = ref('');

const personalSelects = computed(() => [
  { name: 'genderId' as const, label: 'Sexo', options: props.genders },
  { name: 'maritalStatusId' as const, label: 'Estado civil', options: props.maritalStatuses },
  { name: 'levelEducationId' as const, label: 'Escolaridade', options: props.educationLevels },
]);

const ecclesialSelects = computed(() => [
  { name: 'categoryId' as const, label: 'Categoria', options: props.categories },
  { name: 'originId' as const, label: 'Origem', options: props.origins },
  { name: 'memberTypeId' as const, label: 'Tipo de membro', options: props.memberTypes },
]);

const multiSelects = computed(() => [
  { name: 'positionIds' as const, label: 'Cargos', options: props.positions },
  { name: 'ministryIds' as const, label: 'Ministérios', options: props.ministries },
]);

const modalTitle = computed(() =>
  isEditMode.value ? 'Editar pessoa' : 'Cadastro — Pessoa',
);

function digitsOnly(s: string) {
  return s.replace(/\D/g, '');
}

/** Valida CPF pelos dígitos verificadores (aceita valor com ou sem máscara). */
function isValidCpf(value: string): boolean {
  const cpf = digitsOnly(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const len of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    if (((sum * 10) % 11) % 10 !== Number(cpf[len])) return false;
  }
  return true;
}

const todayIso = () => new Date().toISOString().slice(0, 10);

const idRequired = z.preprocess(
  (v) => {
    if (v === '' || v === null || v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  },
  z.number({ message: 'Campo obrigatório' }).positive('Selecione uma opção válida'),
);

const peopleSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z
    .union([z.literal(''), z.string().email('E-mail inválido')])
    .optional()
    .default(''),
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine(isValidCpf, 'CPF inválido'),
  rg: z.string().optional().default(''),
  birthdate: z
    .string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((v) => v <= todayIso(), 'Data não pode ser futura'),
  phoneNumber: z
    .string()
    .optional()
    .default('')
    .refine((v) => !v || [10, 11].includes(digitsOnly(v).length), 'Telefone inválido'),
  categoryId: idRequired,
  originId: idRequired,
  maritalStatusId: idRequired,
  genderId: idRequired,
  levelEducationId: idRequired,
  observation: z.string().optional().default(''),
  address: z.object({
    zipCode: z
      .string()
      .min(1, 'CEP é obrigatório')
      .refine((v) => digitsOnly(v).length === 8, 'CEP inválido'),
    street: z.string().min(1, 'Endereço é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    reference: z.string().optional().default(''),
    districtId: idRequired,
  }),
  baptized: z.boolean(),
  conversionDate: z.string().optional().default(''),
  baptismDate: z.string().optional().default(''),
  memberTypeId: idRequired,
  positionIds: z.array(z.number()).min(1, 'Selecione ao menos um cargo'),
  ministryIds: z.array(z.number()).min(1, 'Selecione ao menos um ministério'),
});

function getInitialValues() {
  return {
    name: '',
    email: '',
    cpf: '',
    rg: '',
    birthdate: '',
    phoneNumber: '',
    categoryId: '' as const,
    originId: '' as const,
    maritalStatusId: '' as const,
    genderId: '' as const,
    levelEducationId: '' as const,
    observation: '',
    address: {
      zipCode: '',
      street: '',
      number: '',
      reference: '',
      districtId: '' as const,
    },
    baptized: false,
    conversionDate: '',
    baptismDate: '',
    memberTypeId: '' as const,
    positionIds: [] as number[],
    ministryIds: [] as number[],
  };
}

/** Ids inválidos (0) viram '' para o select cair em "Selecione" em vez de seleção fantasma. */
const idOrEmpty = (n: number) => (n > 0 ? n : ('' as const));

function mapDetailToFormValues(detail: IPeopleDetail) {
  return {
    ...getInitialValues(),
    name: detail.name,
    email: detail.email,
    cpf: detail.cpf,
    rg: detail.rg,
    birthdate: detail.birthdate,
    phoneNumber: detail.phoneNumber,
    categoryId: idOrEmpty(detail.categoryId),
    originId: idOrEmpty(detail.originId),
    maritalStatusId: idOrEmpty(detail.maritalStatusId),
    genderId: idOrEmpty(detail.genderId),
    levelEducationId: idOrEmpty(detail.levelEducationId),
    observation: detail.observation,
    address: {
      zipCode: detail.address.zipCode,
      street: detail.address.street,
      number: detail.address.number,
      reference: detail.address.reference,
      districtId: idOrEmpty(detail.address.districtId),
    },
    baptized: detail.member.baptized,
    conversionDate: detail.member.conversionDate,
    baptismDate: detail.member.baptismDate,
    memberTypeId: idOrEmpty(detail.member.memberTypeId),
    positionIds: detail.member.positions.map((p) => p.positionId).filter(Boolean),
    ministryIds: detail.member.ministries.map((m) => m.ministryId).filter(Boolean),
  };
}

const { handleSubmit, resetForm, setFieldValue, errors, defineField } = useForm({
  validationSchema: toTypedSchema(peopleSchema),
  initialValues: getInitialValues(),
});

/**
 * Cada campo é conectado ao vee-validate via `defineField` e agrupado em `form`,
 * para usarmos `v-model="form.name"` no template (mesmo padrão do Auth.vue).
 * A validação acontece pelo schema do `useForm`; os erros vêm de `errors`.
 */
const [name] = defineField('name');
const [email] = defineField('email');
const [cpf] = defineField('cpf');
const [rg] = defineField('rg');
const [birthdate] = defineField('birthdate');
const [phoneNumber] = defineField('phoneNumber');
const [observation] = defineField('observation');
const [genderId] = defineField('genderId');
const [maritalStatusId] = defineField('maritalStatusId');
const [levelEducationId] = defineField('levelEducationId');
const [categoryId] = defineField('categoryId');
const [originId] = defineField('originId');
const [memberTypeId] = defineField('memberTypeId');
const [baptized] = defineField('baptized');
const [conversionDate] = defineField('conversionDate');
const [baptismDate] = defineField('baptismDate');
const [positionIds] = defineField('positionIds');
const [ministryIds] = defineField('ministryIds');
const [zipCode] = defineField('address.zipCode');
const [street] = defineField('address.street');
const [number] = defineField('address.number');
const [reference] = defineField('address.reference');
const [districtId] = defineField('address.districtId');

const form = reactive({
  name,
  email,
  cpf,
  rg,
  birthdate,
  phoneNumber,
  observation,
  genderId,
  maritalStatusId,
  levelEducationId,
  categoryId,
  originId,
  memberTypeId,
  baptized,
  conversionDate,
  baptismDate,
  positionIds,
  ministryIds,
  address: reactive({
    zipCode,
    street,
    number,
    reference,
    districtId,
  }),
});

/** Alterna a presença de `id` em uma lista de checkboxes (cargos/ministérios). */
function toggleId(list: number[] | undefined, id: number): number[] {
  const cur = [...(list ?? [])];
  const i = cur.indexOf(id);
  if (i >= 0) cur.splice(i, 1);
  else cur.push(id);
  return cur;
}

const ECCLESIAL_FIELDS = [
  'categoryId',
  'originId',
  'memberTypeId',
  'baptized',
  'conversionDate',
  'baptismDate',
  'positionIds',
  'ministryIds',
];

function tabForField(field: string): number {
  if (field.startsWith('address.')) return TAB_ADDRESS;
  if (ECCLESIAL_FIELDS.some((f) => field === f || field.startsWith(`${f}.`))) {
    return TAB_ECCLESIAL;
  }
  return TAB_PERSONAL;
}

function onCitySelect(v: string | number | null) {
  const id = v === '' || v === null ? NaN : Number(v);
  if (!Number.isFinite(id) || id === selectedCityId.value) return;
  selectedCityId.value = id;
  cityError.value = '';
  // Cast: o path tipado do vee-validate não infere campos aninhados com z.preprocess.
  (setFieldValue as (path: string, value: unknown) => void)('address.districtId', '');
  emit('city-change', id);
}

function buildPayload(values: z.infer<typeof peopleSchema>): IPeopleCreatePayload {
  return {
    name: values.name.trim(),
    email: values.email?.trim() ?? '',
    cpf: digitsOnly(values.cpf),
    rg: values.rg?.trim() ?? '',
    birthdate: values.birthdate,
    phoneNumber: digitsOnly(values.phoneNumber || ''),
    categoryId: values.categoryId,
    originId: values.originId,
    maritalStatusId: values.maritalStatusId,
    genderId: values.genderId,
    levelEducationId: values.levelEducationId,
    observation: values.observation?.trim() ?? '',
    address: {
      zipCode: values.address.zipCode.trim(),
      street: values.address.street.trim(),
      number: values.address.number.trim(),
      reference: values.address.reference?.trim() ?? '',
      districtId: values.address.districtId,
      cityId: selectedCityId.value as number,
    },
    member: {
      baptized: values.baptized,
      conversionDate: values.conversionDate || '',
      baptismDate: values.baptismDate || '',
      memberTypeId: values.memberTypeId,
      positions: values.positionIds.map((positionId) => ({ positionId })),
      ministries: values.ministryIds.map((ministryId) => ({ ministryId })),
    },
  };
}

const onSubmit = handleSubmit(
  (values) => {
    if (!selectedCityId.value) {
      cityError.value = 'Selecione uma cidade.';
      peopleTabIndex.value = TAB_ADDRESS;
      return;
    }
    emit('submit', buildPayload(values), currentId.value);
  },
  // Leva o usuário até a primeira aba que contém erro de validação.
  ({ errors }) => {
    const tabs = Object.keys(errors).map(tabForField);
    if (tabs.length) peopleTabIndex.value = Math.min(...tabs);
  },
);

/** Abre o modal. Passe um `IPeopleDetail` para entrar em modo de edição. */
const openModal = (detail?: IPeopleDetail) => {
  isEditMode.value = !!detail;
  currentId.value = detail?.id ?? null;
  peopleTabIndex.value = TAB_PERSONAL;
  cityError.value = '';
  selectedCityId.value = detail?.address.cityId ?? props.cities[0]?.id ?? null;
  resetForm({ values: detail ? mapDetailToFormValues(detail) : getInitialValues() });
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm({ values: getInitialValues() });
  isEditMode.value = false;
  currentId.value = null;
  peopleTabIndex.value = TAB_PERSONAL;
  cityError.value = '';
};

const nextStep = () => {
  if (activeTabIndex.value < stepData.length - 1) activeTabIndex.value++
}

const prevStep = () => {
  if (activeTabIndex.value > 0) activeTabIndex.value--
}

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <BModal
    v-model="showModal"
    :title="modalTitle"
    no-footer
    centered
    scrollable
    size="lg"
    title-class="fw-bold h5"
    cancel-variant="light"
  >
    <form class="text-sm" @submit.prevent="onSubmit">
      <ul class="nav nav-tabs wizard-tabs">
        <li class="nav-item" v-for="(step, index) in stepData" :key="index">
          <a
            class="nav-link"
            href=""
            @click.prevent="activeTabIndex = index"
            :class="{
              'wizard-item-done': index < activeTabIndex,
              active: index === activeTabIndex,
            }"
          >
            <span class="d-flex align-items-center">
              <Icon :icon="step.icon" class="fs-32" />
              <span class="flex-grow-1 ms-2 text-truncate">
                <span class="mb-0 lh-base d-block fw-semibold text-body fs-base">{{ step.title }}</span>
                <span class="fs-xxs mb-0">{{ step.subtitle }}</span>
              </span>
            </span>
          </a>
        </li>
      </ul>

      <div class="tab-content pt-3">
        <div v-if="activeTabIndex === 0">
          <BRow class="g-3">
            <BCol md="6">
              <KInput
                v-model="form.name"
                label="Nome"
                required
                type="text"
                placeholder="Nome completo"
                :error="errors.name"
              />
            </BCol>
            <BCol md="6">
              <KInput
                v-model="form.cpf"
                label="CPF"
                required
                type="text"
                placeholder="000.000.000-00"
                maxlength="14"
                mask="###.###.###-##"
                :error="errors.cpf"
              />
            </BCol>
            <BCol md="6">
              <KInput
                v-model="form.rg"
                label="RG"
                type="text"
                placeholder="Documento"
                :error="errors.rg"
              />
            </BCol>
            <BCol md="6">
              <KDatePicker
                v-model="form.birthdate"
                label="Data de nascimento"
                required
                :error="errors.birthdate"
              />
            </BCol>
            <BCol v-for="sel in personalSelects" :key="sel.name" md="6">
              <KSelect
                v-model="form[sel.name]"
                :label="sel.label"
                required
                :options="sel.options"
                :error="errors[sel.name]"
              />
            </BCol>
            <BCol md="6">
              <KInput
                v-model="form.email"
                label="E-mail"
                type="email"
                placeholder="email@exemplo.com"
                :error="errors.email"
              />
            </BCol>
            <BCol md="6">
              <KInput
                v-model="form.phoneNumber"
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                mask="(##) #####-####"
                :error="errors.phoneNumber"
              />
            </BCol>
            <BCol cols="12">
              <KTextarea
                v-model="form.observation"
                label="Observação"
                :rows="3"
                maxlength="500"
                placeholder="Observações adicionais"
                :error="errors.observation"
              />
            </BCol>
          </BRow>
        </div>

        <div v-else-if="activeTabIndex === 1">
          <BRow class="g-3">
            <BCol v-for="sel in ecclesialSelects" :key="sel.name" md="6">
              <KSelect
                v-model="form[sel.name]"
                :label="sel.label"
                required
                :options="sel.options"
                :error="errors[sel.name]"
              />
            </BCol>
            <BCol cols="12">
              <KCheckbox v-model="form.baptized" label="Batizado" />
            </BCol>
            <BCol md="6">
              <KDatePicker
                v-model="form.conversionDate"
                label="Membro desde (conversão)"
                :error="errors.conversionDate"
              />
            </BCol>
            <BCol md="6">
              <KDatePicker
                v-model="form.baptismDate"
                label="Data do batismo"
                :error="errors.baptismDate"
              />
            </BCol>

            <BCol v-for="ms in multiSelects" :key="ms.name" cols="12">
              <label class="form-label d-block mb-2">
                {{ ms.label }} <span class="text-danger">*</span>
              </label>
              <div class="border rounded p-3 max-height-checkbox-list">
                <KCheckbox
                  v-for="opt in ms.options"
                  :key="opt.id"
                  :label="opt.name"
                  :model-value="(form[ms.name] as number[])?.includes(opt.id)"
                  @update:model-value="form[ms.name] = toggleId(form[ms.name] as number[] | undefined, opt.id)"
                />
              </div>
              <div v-if="errors[ms.name]" class="text-danger small mt-1">{{ errors[ms.name] }}</div>
            </BCol>
          </BRow>
        </div>

        <div v-else>
          <BRow class="g-3">
            <BCol md="4">
              <KInput
                v-model="form.address.zipCode"
                label="CEP"
                required
                type="text"
                placeholder="00000-000"
                mask="#####-###"
                :error="errors['address.zipCode']"
              />
            </BCol>
            <BCol md="3">
              <KInput
                v-model="form.address.number"
                label="Nº"
                required
                type="text"
                placeholder="Número"
                :error="errors['address.number']"
              />
            </BCol>
            <BCol md="5">
              <KInput
                v-model="form.address.street"
                label="Logradouro"
                required
                type="text"
                placeholder="Rua, avenida…"
                :error="errors['address.street']"
              />
            </BCol>
            <BCol cols="12">
              <KInput
                v-model="form.address.reference"
                label="Referência"
                type="text"
                placeholder="Ponto de referência"
                :error="errors['address.reference']"
              />
            </BCol>
            <BCol md="6">
              <KSelect
                label="Cidade"
                required
                :options="props.cities"
                :model-value="selectedCityId"
                :error="cityError"
                @update:model-value="onCitySelect"
              />
            </BCol>
            <BCol md="6">
              <KSelect
                v-model="form.address.districtId"
                label="Bairro"
                required
                :options="props.districts"
                :error="errors['address.districtId']"
              />
            </BCol>
          </BRow>
        </div>
      </div>

      <BRow class="g-3 mt-3">
        <BCol cols="12" class="d-flex justify-content-end gap-2">
          <KButton variant="light" type="button" @click="prevStep" v-if="activeTabIndex != 0">
            ← Voltar
          </KButton>
          <KButton variant="primary" type="submit" @click="activeTabIndex === stepData.length - 1 ? nextStep() : nextStep()">
            {{ submitting ? 'Salvando…' : 'Avançar  →' }}
          </KButton>
        </BCol>
      </BRow>
    </form>
  </BModal>
</template>

<style scoped>
.max-height-checkbox-list {
  max-height: 9rem;
  overflow-y: auto;
}
</style>
