import http from '@/infra/plugins/http'
import type { IPaginateResponse } from '@/infra/types/http.interfaces'
import type { ITeam, ITeamMemberPayload, ITeamPayload } from '@/modules/team/types/team.interface'
import type { AxiosResponse } from 'axios'

export const TeamService = () => {
  const getAll = (query: object = {}): Promise<AxiosResponse<IPaginateResponse<ITeam>>> => {
    return http.get<IPaginateResponse<ITeam>>('/teams', { params: query })
  }

  const create = (payload: ITeamPayload): Promise<AxiosResponse<ITeam>> => {
    return http.post<ITeam>('/teams', payload)
  }

  const update = (id: number, payload: ITeamPayload): Promise<AxiosResponse<ITeam>> => {
    return http.put<ITeam>(`/teams/${id}`, payload)
  }

  const updateTeamMembers = (teamId: number, payload: ITeamMemberPayload): Promise<AxiosResponse<ITeam>> => {
    return http.put<ITeam>(`/teams/${teamId}/members`, payload)
  }

  return { getAll, create, update, updateTeamMembers }
}
