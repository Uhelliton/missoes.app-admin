import http from '@/infra/plugins/http-client'

/** Categorias de pessoa/membro. Ajuste o path conforme o backend. */
export const PeopleCategoryService = () => ({
  getAll: () => http.get('/people/categories'),
})
