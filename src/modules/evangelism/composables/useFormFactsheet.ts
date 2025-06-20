import { computed, reactive } from 'vue'
import { required, numeric, helpers, email, minLength } from '@vuelidate/validators'
import type {IEvangelismRecord, IEvangelismRecordPayload} from "@/modules/evangelism/types/evangelism-record.interface";

export const useFormFactSheet = () => {
  const initialForm: IEvangelismRecordPayload = {
    name: '',
    code: '',
    age: null,
    phoneNumber: '',
    acceptedCourse: null,
    acceptedCell: null,
    madeDecision: null,
    projectId: null,
    teamId: null,
    companionsCount: null,
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
    },
  }

  const form = reactive<IEvangelismRecordPayload>({ ...initialForm })

  const setFormData = (payload: IEvangelismRecord) => {
    // const birthday = new Date(payload.birthday)
    // form.name = payload.name
    // form.email = payload.email
    // form.cpf = payload.cpf
    // form.cityId = payload.city.id
    // form.stateId = payload.city.stateId
    // form.churchId = payload.church.id
    // form.phoneNumber = payload.phoneNumber
    // form.birthday = birthday.toLocaleDateString('pt-BR')
    // form.gender = payload.gender
    // form.maritalStatus = payload.maritalStatus
    // form.select = {
    //   city: payload.city,
    //   state: payload.city.state,
    //   church: payload.church,
    // }
  }

  const resetForm = () => {
    Object.assign(form, initialForm)
    // form.select.church = {}
  }

  const rules = computed(() => ({
    name: { required },
    code: { required, minLength: minLength(4) },
    age: { required },
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
    },
  }))

  return { form, setFormData, resetForm, rules }
}
