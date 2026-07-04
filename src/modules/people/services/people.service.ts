import type { AxiosResponse } from 'axios'
import http from '@/infra/plugins/http-client'
import type {
  IPeopleCreatePayload,
  IPeopleDetail,
  IPeoplePaginateResponse,
  IPeopleUpdatePayload,
} from '../interfaces/people.interface.ts'

export const PeopleService = () => {
  const resource = '/people'

  const getAll = (
    params?: Record<string, string | number | undefined>,
  ): Promise<AxiosResponse<IPeoplePaginateResponse>> => {
    return http.get<IPeoplePaginateResponse>(resource, { params })
  }

  const getById = (uuid: number | string): Promise<AxiosResponse<IPeopleDetail>> => {
    return http.get<IPeopleDetail>(`${resource}/${uuid}`)
  }

  const create = (payload: IPeopleCreatePayload) => {
    return http.post(`${resource}`, payload)
  }

  const update = (id: number | string, payload: IPeopleUpdatePayload) => {
    return http.put(`${resource}/${id}`, payload)
  }

  const remove = (id: number | string) => {
    return http.delete(`${resource}/${id}`)
  }

  return { getAll, getById, create, update, remove }
}
