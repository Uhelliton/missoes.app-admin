import http from '@/infra/plugins/http'
import type { IAuthPayload, IAuthResponse } from '@/modules/auth/interfaces/auth.interface'

export const AuthService = () => {
  const authenticate = (payload: IAuthPayload): Promise<any> => {
    return  http.post<IAuthResponse>('/auth/login', payload)
  }

  return { authenticate }
}
