import http from '@/infra/plugins/http'
import type { IPaginateResponse } from '@/infra/types/http.interfaces'
import type { AxiosResponse } from 'axios'
import type {
  IEvangelismRecord,
  IEvangelismRecordPayload,
} from '@/modules/evangelism/types/evangelism-record.interface'

export const EvangelismRecordService = () => {
  const getAll = (query: object = {}): Promise<AxiosResponse<IPaginateResponse<IEvangelismRecord>>> => {
    return http.get<IPaginateResponse<IEvangelismRecord>>('/evangelism-records', { params: query })
  }

  const create = (payload: IEvangelismRecordPayload): Promise<AxiosResponse<IEvangelismRecord>> => {
    return http.post<IEvangelismRecord>('/evangelism-records', payload)
  }

  const update = (id: number, payload: IEvangelismRecordPayload): Promise<AxiosResponse<IEvangelismRecord>> => {
    return http.put<IEvangelismRecord>(`/evangelism-records/${id}`, payload)
  }

  return { getAll, create, update }
}
