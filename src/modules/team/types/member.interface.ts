import { MaritalStatus, Gender } from '@/modules/team/types/member.type'
import type { ISelect } from '@/components/forms/Select.vue'
import type { ICity } from '@/modules/location/types/city.interface'
import type { IChurch } from '@/modules/project/types/church.interface'

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
  birthday?: string
  gender?: Gender.MALE | Gender.FEMALE
  cityId: number
  maritalStatus?: MaritalStatus.SINGLE | MaritalStatus.MARRIED | MaritalStatus.DIVORCED | MaritalStatus.WIDOWED
  city: ICity
  church: IChurch
  teamMember?: {
    id: number
    teamId: number
    memberId: number
  }
}

export interface IMemberSimplified {
  id: number
  name: string
}

export interface IMemberPayload {
  name: string
  email: string
  cpf: string
  phoneNumber?: string
  birthday: string
  gender: string
  maritalStatus: string
  cityId: number
  stateId: number
  churchId: number
  select: SelectMap
}
