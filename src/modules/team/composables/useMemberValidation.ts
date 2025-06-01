import { computed } from 'vue'
import { required, numeric, helpers, email } from "@vuelidate/validators";

export const useMemberValidation = () => {
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
          notZero: helpers.withMessage('Cidade obrigatória', (val) => val > 0)
        }
      },
      state: {
        id: {
          required,
          notZero: helpers.withMessage('Estado obrigatório', (val) => val > 0)
        }
      },
      church: {
        id: {
          required,
          notZero: helpers.withMessage('Igreja obrigatório', (val) => val > 0)
        }
      }
    },
  }))

  return { rules }
}
