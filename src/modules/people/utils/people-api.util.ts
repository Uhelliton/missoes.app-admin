import type {
  ICityDetail,
  ILookupItem,
  IPeopleCreatePayload,
  IPeopleDetail,
} from '../interfaces/people.interface'

/**
 * Normaliza corpo da API: array direto, { data: [] } ou { items: [] }.
 */
export function extractLookupList(apiBody: unknown): ILookupItem[] {
  if (apiBody == null) return []
  if (Array.isArray(apiBody)) return apiBody as ILookupItem[]
  if (typeof apiBody === 'object') {
    const o = apiBody as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data as ILookupItem[]
    if (Array.isArray(o.items)) return o.items as ILookupItem[]
  }
  return []
}

/** Desembrulha cidade: corpo direto, { data: city } ou { data: { data: city } }. */
export function extractCity(apiBody: unknown): ICityDetail | null {
  if (apiBody == null || typeof apiBody !== 'object') return null
  const o = apiBody as Record<string, unknown>
  if (typeof o.id === 'number' && typeof o.name === 'string') {
    return o as unknown as ICityDetail
  }
  const inner = o.data
  if (inner && typeof inner === 'object') {
    const d = inner as Record<string, unknown>
    if (typeof d.id === 'number') return d as unknown as ICityDetail
    if (d.data && typeof d.data === 'object') {
      const dd = d.data as Record<string, unknown>
      if (typeof dd.id === 'number') return dd as unknown as ICityDetail
    }
  }
  return null
}

function pickId(flat: unknown, nested: unknown): number {
  if (typeof flat === 'number' && Number.isFinite(flat)) return flat
  if (nested && typeof nested === 'object' && nested !== null && 'id' in nested) {
    const n = Number((nested as { id: unknown }).id)
    if (Number.isFinite(n)) return n
  }
  return 0
}

/**
 * Normaliza resposta GET /people/:id para `IPeopleDetail`.
 * Aceita envelope `{ data: {...} }` ou corpo direto; tenta IDs flat ou aninhados (ex.: `gender.id`).
 */
export function normalizePeopleDetailFromApi(raw: unknown): IPeopleDetail | null {
  if (raw == null || typeof raw !== 'object') return null
  const root = raw as Record<string, unknown>
  const r =
    root.data && typeof root.data === 'object'
      ? (root.data as Record<string, unknown>)
      : root

  const id = Number(r.id)
  if (!Number.isFinite(id) || id <= 0) return null

  const addr = (r.address && typeof r.address === 'object'
    ? r.address
    : {}) as Record<string, unknown>
  const mem = (r.member && typeof r.member === 'object'
    ? r.member
    : {}) as Record<string, unknown>

  const positionsRaw = mem.positions
  const ministriesRaw = mem.ministries
  const positions = Array.isArray(positionsRaw)
    ? positionsRaw
        .map((p) =>
          p && typeof p === 'object' && p !== null && 'positionId' in p
            ? Number((p as { positionId: unknown }).positionId)
            : NaN,
        )
        .filter((n) => Number.isFinite(n))
    : []
  const ministries = Array.isArray(ministriesRaw)
    ? ministriesRaw
        .map((m) =>
          m && typeof m === 'object' && m !== null && 'ministryId' in m
            ? Number((m as { ministryId: unknown }).ministryId)
            : NaN,
        )
        .filter((n) => Number.isFinite(n))
    : []

  const payload: IPeopleCreatePayload = {
    name: String(r.name ?? ''),
    email: String(r.email ?? ''),
    cpf: String(r.cpf ?? ''),
    rg: String(r.rg ?? ''),
    birthdate: String(r.birthdate ?? ''),
    phoneNumber: String(r.phoneNumber ?? r.phone ?? ''),
    categoryId: pickId(r.categoryId, r.category),
    originId: pickId(r.originId, r.origin),
    maritalStatusId: pickId(r.maritalStatusId, r.maritalStatus),
    genderId: pickId(r.genderId, r.gender),
    levelEducationId: pickId(r.levelEducationId, r.levelEducation),
    observation: String(r.observation ?? ''),
    address: {
      zipCode: String(addr.zipCode ?? ''),
      street: String(addr.street ?? ''),
      number: String(addr.number ?? ''),
      reference: String(addr.reference ?? ''),
      districtId: pickId(addr.districtId, addr.district),
      cityId: pickId(addr.cityId, addr.city),
    },
    member: {
      baptized: Boolean(mem.baptized),
      conversionDate: String(mem.conversionDate ?? ''),
      baptismDate: String(mem.baptismDate ?? ''),
      memberTypeId: pickId(mem.memberTypeId, mem.memberType),
      positions:
        positions.length > 0
          ? positions.map((positionId) => ({ positionId }))
          : pickId(undefined, mem.position)
            ? [{ positionId: pickId(undefined, mem.position) }]
            : [],
      ministries:
        ministries.length > 0
          ? ministries.map((ministryId) => ({ ministryId }))
          : pickId(undefined, mem.ministry)
            ? [{ ministryId: pickId(undefined, mem.ministry) }]
            : [],
    },
  }

  if (!payload.address.cityId) {
    payload.address.cityId = pickId(addr.cityId, addr.city) || 1
  }

  return { ...payload, id }
}
