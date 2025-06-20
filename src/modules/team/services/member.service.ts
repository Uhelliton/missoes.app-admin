import http from '@/infra/plugins/http'
import type { IPaginateResponse } from '@/infra/types/http.interfaces'
import type { IMember, IMemberPayload } from '@/modules/team/types/member.interface'
import type { AxiosResponse } from 'axios'

export const MemberService = () => {
  const getAll = (query: object = {}): Promise<AxiosResponse<IPaginateResponse<IMember>>> => {
    return http.get<IPaginateResponse<IMember>>('/members', { params: query })
  }

  const create = (payload: IMemberPayload): Promise<AxiosResponse<IMember>> => {
    return http.post<IMember>('/members', payload)
  }

  const update = (id: number, payload: IMemberPayload): Promise<AxiosResponse<IMember>> => {
    return http.put<IMember>(`/members/${id}`, payload)
  }

  return { getAll, create, update }
}
