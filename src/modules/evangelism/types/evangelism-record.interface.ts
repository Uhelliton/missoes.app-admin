import { Gender } from '@/modules/team/types/member.type'
import type { ISelect } from '@/components/forms/Select.vue'
import type { IDistrict} from '@/modules/location/types/city.interface'
import type {IMemberSimplified} from "@/modules/team/types/member.interface";

type FormSelectFields =  'district' | 'team' | 'members'
export type SelectMap = {
  [key in FormSelectFields]: ISelect
}

export interface IEvangelismRecord {
  id: number
  name: string
  code: string
  phoneNumber: string
  gender?: Gender.MALE | Gender.FEMALE
  district: IDistrict
  members: Array<IMemberSimplified>
}

export interface IEvangelismRecordAddressPayload {
  street: string
  number: string
  reference: string
  cityId: number
  districtId: number
}

export interface IEvangelismRecordPayload {
  name: string
  code: string
  ageCategory: 'Criança' | 'Adolescente' | 'Jovem' | 'Adulto' | 'Idoso'
  phoneNumber: string
  acceptedCourse: boolean
  acceptedCell: boolean
  madeDecision: boolean
  projectId: number
  teamId: number
  notes: string
  additionalPeople?: Array<string>
  evangelizedAt: string
  gender: Gender.MALE | Gender.FEMALE,
  recordAddress: IEvangelismRecordAddressPayload
  membersIds: number[],
  select: SelectMap
}
