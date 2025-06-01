import http from '@/infra/plugins/http'
import type { IAuthPayload, IAuthResponse } from '@/modules/auth/interfaces/auth.interface'

export const TeamService = () => {
  const getAll = (): Promise<any> => {
    return  http.get<IAuthResponse>('/teams')
  }

  return { getAll }
}
