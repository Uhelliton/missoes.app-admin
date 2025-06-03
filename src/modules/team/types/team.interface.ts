import type { ISelect } from '@/components/forms/Select.vue'
import type { IMember } from '@/modules/team/types/member.interface'

export interface ITeam {
  id: number
  name: string
  color: string
  leader: IMember
  members: Array<IMember>
}

export interface ITeamPayload {
  name: string
  color: string
  leaderId: number
  select: {
    leader: ISelect
  }
}

export interface ITeamMemberPayload {
  memberIds: number[]
}
