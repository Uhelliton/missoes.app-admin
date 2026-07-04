import http from '@/infra/plugins/http-client'

/** Ajuste o path se a API usar outro recurso (ex.: /lookups/genders). */
export const GenderService = () => ({
  getAll: () => http.get('/people/genders'),
})
