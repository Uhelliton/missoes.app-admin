import http from '@/infra/plugins/http'
import type { IAuthPayload, IAuthResponse } from '@/modules/auth/interfaces/auth.interface'

export const ChurchService = () => {
  const getAll = (): Promise<any> => {
    return  http.get<IAuthResponse>('/churches')
  }

  return { getAll }
}
