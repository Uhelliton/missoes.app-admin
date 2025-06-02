import { computed, reactive } from 'vue'
import type { IMember, IMemberPayload } from '@/modules/team/types/member.interface'
import { locationDefault } from '@/infra/helpers/constants'
import { required, numeric, helpers, email } from '@vuelidate/validators'

export const useFormMember = () => {
  const form = reactive<IMemberPayload>({
    name: '',
    email: '',
    cpf: '',
    churchId: 0,
    cityId: locationDefault.city.id,
    stateId: locationDefault.state.id,
    phoneNumber: '',
    gender: '',
    maritalStatus: '',
    select: {
      city: locationDefault.city,
      state: locationDefault.state,
      church: {} as ISelect,
    },
  })

  const setFormData = (payload: IMember) => {
    form.name = payload.name
    form.email = payload.email
    form.cpf = payload.cpf
    form.cityId = payload.city.id
    form.stateId = payload.city.stateId
    form.churchId = payload.church.id
    form.phoneNumber = payload.phoneNumber
    form.gender = payload.gender
    form.maritalStatus = payload.maritalStatus
    form.select = {
      city: payload.city,
      state: payload.city.state,
      church: payload.church,
    }
  }

  const rules = computed(() => ({
    name: { required },
    email: { required, email },
    cpf: {
      required,
    },
    gender: { required },
    maritalStatus: { required },
    select: {
      city: {
        id: {
          required,
          notZero: helpers.withMessage('Cidade obrigatória', (val) => val > 0),
        },
      },
      state: {
        id: {
          required,
          notZero: helpers.withMessage('Estado obrigatório', (val) => val > 0),
        },
      },
      church: {
        id: {
          required,
          notZero: helpers.withMessage('Igreja obrigatório', (val) => val > 0),
        },
      },
    },
  }))

  return { form, setFormData, rules }
}
