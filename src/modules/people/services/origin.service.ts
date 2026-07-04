import http from '@/infra/plugins/http-client'

export const OriginService = () => ({
  getAll: () => http.get('/people/origins'),
})
