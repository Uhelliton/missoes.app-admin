import { Gender } from '@/modules/team/types/member.type'
import type { ISelect } from '@/components/forms/Select.vue'
import type { IDistrict} from '@/modules/location/types/city.interface'
import type {IMemberSimplified} from "@/modules/team/types/member.interface";

type FormSelectFields =  'district' | 'team'
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
  age: number
  phoneNumber: string
  acceptedCourse: boolean
  acceptedCell: boolean
  madeDecision: boolean
  projectId: boolean
  teamId: number
  companionsCount: number
  notes: string
  evangelizedAt: string
  gender: Gender.MALE | Gender.FEMALE,
  recordAddress: IEvangelismRecordAddressPayload
  membersIds: number[],
  select: SelectMap
}
