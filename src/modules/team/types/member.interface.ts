import { MaritalStatus, Gender } from '@/modules/team/types/member.type'
import type { ISelect } from '@/components/forms/Select.vue'

type FormSelectFields = 'city' | 'state' | 'church'
export type SelectMap = {
  [key in FormSelectFields]: ISelect
}

export interface IMember {
  id: number
  name: string
  email: string
  cpf: string
  phoneNumber: string
  gender?: Gender.MALE | Gender.FEMALE
  cityId: number
  maritalStatus?: MaritalStatus.SINGLE | MaritalStatus.MARRIED | MaritalStatus.DIVORCED | MaritalStatus.WIDOWED
}

export interface IMemberPayload {
  name: string
  email: string
  cpf: string
  phoneNumber?: string
  birthday?: string
  gender: string
  maritalStatus: string
  cityId: number
  stateId: number
  churchId: number
  select: SelectMap
}
