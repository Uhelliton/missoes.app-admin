import http from '@/infra/plugins/http-client'
import type { AuthPayload, AuthResponse } from './../interfaces/auth.interface'

export const AuthService = () => {
  const authenticate = (payload: AuthPayload): Promise<any> => {
    return http.post<AuthResponse>('/auth/login', payload)
  }

  return { authenticate }
}
