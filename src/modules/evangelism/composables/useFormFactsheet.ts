import { computed, reactive } from 'vue'
import { required, numeric, helpers, email, minLength } from '@vuelidate/validators'
import type {IEvangelismRecord, IEvangelismRecordPayload} from "@/modules/evangelism/types/evangelism-record.interface";
import type {ISelect} from "@/components/forms/Select.vue";
import {formatDateToPtBr, } from "@/infra/helpers/helper";

const minOneSelected = helpers.withMessage(
  'Selecione pelo menos um item',
  value => Array.isArray(value) && value.length > 0
)

export const useFormFactSheet = () => {
  const initialForm: IEvangelismRecordPayload = {
    name: '',
    code: '',
    ageCategory: null,
    phoneNumber: '',
    additionalPeople: [],
    acceptedCourse: false,
    acceptedCell: false,
    madeDecision: false,
    projectId: null,
    teamId: null,
    notes: '',
    evangelizedAt: '',
    gender: '',
    recordAddress: {
      street: '',
      number: '',
      reference: '',
      cityId: null,
      districtId: null,
    },
    membersIds: [],
    select: {
      distric:  {} as ISelect,
      team: {} as ISelect,
      members: [] as Array<ISelect>,
    },
  }

  const form = reactive<IEvangelismRecordPayload>({ ...initialForm })

  const setFormData = (payload: IEvangelismRecord) => {
    form.name = payload.name
    form.code = payload.code
    form.ageCategory = payload.ageCategory
    form.acceptedCourse = payload.acceptedCourse
    form.acceptedCell = payload.acceptedCell
    form.madeDecision = payload.madeDecision
    form.projectId = payload.project.id
    form.teamId = payload.team.id
    form.phoneNumber = payload.phoneNumber
    form.evangelizedAt = formatDateToPtBr(payload.evangelizedAt)
    form.gender = payload.gender
    form.additionalPeople = payload.additionalPeople
    form.notes = payload.notes
    form.recordAddress = {
      street: payload.recordAddress.street,
      number: payload.recordAddress.number,
      reference: payload.recordAddress.reference,
      cityId: payload.recordAddress.district.cityId,
      districtId: payload.recordAddress.district.id,
    },
    form.membersIds = payload.members.map(({ id }) => id)
    form.select = {
      district: payload.recordAddress.district,
      team: payload.team,
      members: payload.members,
    }
  }

  const resetForm = () => {
    Object.assign(form, initialForm)
    form.select.distric = {}
    form.select.team = {}
    form.select.members = []
  }

  const rules = computed(() => ({
    name: { required },
    code: { required, minLength: minLength(4) },
    evangelizedAt: { required },
    ageCategory: { required },
    gender: { required },
    recordAddress: {
      street: { required },
      number: { required },
    },
    select: {
      district: {
        id: {
          required,
          notZero: helpers.withMessage('Bairro obrigatório', (val) => val > 0),
        },
      },
      team: {
        id: {
          required,
          notZero: helpers.withMessage('Igreja obrigatório', (val) => val > 0),
        },
      },
      members: {
        minOneSelected
      },
    },
  }))

  return { form, setFormData, resetForm, rules }
}
