import http from '@/infra/plugins/http-client'

export const MinistryService = () => ({
  getAll: () => http.get('/ministries'),
})
