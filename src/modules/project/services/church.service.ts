import http from '@/infra/plugins/http'
import type { IPaginateResponse } from '@/infra/types/http.interfaces'
import type { IChurch, IChurchPayload } from '@/modules/project/types/church.interface'
import type { AxiosResponse } from 'axios'

export const ChurchService = () => {
  const getAll = (query: object = {}): Promise<AxiosResponse<IPaginateResponse<IChurch>>> => {
    return http.get<IPaginateResponse<IChurch>>('/churches', query)
  }

  const create = (payload: IChurchPayload): Promise<AxiosResponse<IChurch>> => {
    return http.post<IChurch>('/churches', payload)
  }

  const update = (id: number, payload: IChurchPayload): Promise<AxiosResponse<IChurch>> => {
    return http.put<IChurch>(`/churches/${id}`, payload)
  }

  return { getAll, create, update }
}
