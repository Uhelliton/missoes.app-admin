import http from '@/infra/plugins/http-client'

export const EducationLevelService = () => ({
  getAll: () => http.get('/education-levels'),
})
