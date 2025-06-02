import { computed, reactive } from 'vue'
import { required, helpers } from '@vuelidate/validators'
import type {ITeam, ITeamPayload} from "@/modules/team/types/team.interface";
import type {ISelect} from "@/components/forms/Select.vue";

export const useFormTeam = () => {
  const initialForm: ITeamPayload = {
    name: '',
    color: '',
    leaderId: '',
    select: {
      leader: {} as ISelect,
    },
  }

  const form = reactive<ITeamPayload>({ ...initialForm })

  const setFormData = (payload: ITeam) => {
    delete payload.leader.city
    delete payload.leader.church

    form.name = payload.name
    form.color = payload.color
    form.leaderId =  payload.leader.id
    form.select = {
      leader: payload.leader
    }
  }

  const resetForm = () => {
    Object.assign(form, initialForm)
  }

  const rules = computed(() => ({
    name: { required },
    color: { required },
    select: {
      leader: {
        id: {
          required,
          notZero: helpers.withMessage('Lider obrigatório', (val) => val > 0),
        },
      },
    },
  }))

  return { form, setFormData, resetForm, rules }
}
