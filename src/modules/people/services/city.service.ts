import http from '@/infra/plugins/http-client'

import type { ILookupItem } from '../interfaces/people.interface.ts'
import { extractCity, extractLookupList } from '../utils/people-api.util.ts'

const DEFAULT_CITY_ID = 1

export const CityService = () => ({
  getById: (id: number) => http.get(`/cities/${id}`),

  /** Lista cidades; se `GET /cities` não existir, usa apenas `GET /cities/:defaultId`. */
  async listCities(): Promise<ILookupItem[]> {
    try {
      const res = await http.get('/cities')
      const list = extractLookupList(res.data)
      if (list.length) return list
    } catch {
      /* endpoint opcional */
    }
    try {
      const res = await http.get(`/cities/${DEFAULT_CITY_ID}`)
      const city = extractCity(res.data)
      return city ? [{ id: city.id, name: city.name }] : []
    } catch {
      return []
    }
  },
})
