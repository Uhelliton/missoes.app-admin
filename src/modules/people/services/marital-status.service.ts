import http from '@/infra/plugins/http-client'

export const MaritalStatusService = () => ({
  getAll: () => http.get('/marital-statuses'),
})
