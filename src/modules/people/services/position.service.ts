import http from '@/infra/plugins/http-client'

export const PositionService = () => ({
  getAll: () => http.get('/positions'),
})
