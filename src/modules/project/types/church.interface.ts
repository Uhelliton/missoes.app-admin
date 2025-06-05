import type { ICity } from '@/modules/location/types/city.interface'
import type { ISelect } from '@/components/forms/Select.vue'

export interface IChurch {
  id: number
  name: string
  email: string
  cnpj: string
  phoneNumber: string
  city: ICity
}

type FormSelectFields = 'city' | 'state' | 'church'
export type SelectMap = {
  [key in FormSelectFields]: ISelect
}

export interface IChurchPayload {
  name: string
  email: string
  cnpj: string
  phoneNumber?: string
  cityId: number
  stateId: number
  select: SelectMap
}
