import { computed, reactive } from 'vue'
import { locationDefault } from '@/infra/helpers/constants'
import { required, helpers, email } from '@vuelidate/validators'
import type { IChurchPayload, IChurch } from '@/modules/project/types/church.interface'

export const useFormChurch = () => {
  const initialForm: IChurchPayload = {
    name: '',
    email: '',
    cnpj: '',
    cityId: locationDefault.city.id,
    stateId: locationDefault.state.id,
    phoneNumber: '',
    select: {
      city: locationDefault.city,
      state: locationDefault.state,
    },
  }

  const form = reactive<IChurchPayload>({ ...initialForm })

  const setFormData = (payload: IChurch) => {
    form.name = payload.name
    form.email = payload.email
    form.cnpj = payload.cnpj
    form.cityId = payload.city.id
    form.stateId = payload.city.stateId
    form.phoneNumber = payload.phoneNumber
    form.select = {
      city: payload.city,
      state: payload.city.state,
    }
  }

  const resetForm = () => {
    Object.assign(form, initialForm)
  }

  const rules = computed(() => ({
    name: { required },
    cnpj: {
      required,
    },
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
    },
  }))

  return { form, setFormData, resetForm, rules }
}
