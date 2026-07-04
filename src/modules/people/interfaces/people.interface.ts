
export interface ILookupItem {
  id: number
  name: string
}

export interface IDistrictItem {
  id: number
  name: string
}

export interface ICityDetail {
  id: number
  name: string
  districts?: IDistrictItem[]
}

export interface IPeopleCreatePayload {
  name: string
  email: string
  cpf: string
  rg: string
  birthdate: string
  phoneNumber: string
  categoryId: number
  originId: number
  maritalStatusId: number
  genderId: number
  levelEducationId: number
  observation: string
  address: {
    zipCode: string
    street: string
    number: string
    reference: string
    districtId: number
    cityId: number
  }
  member: {
    baptized: boolean
    conversionDate: string
    baptismDate: string
    memberTypeId: number
    positions: { positionId: number }[]
    ministries: { ministryId: number }[]
  }
}

export interface IPeoplePaginateResponse {
  items: IPeopleListItem[]
  meta: {
    currentPage: number
    perPage: number
    totalItems: number
    totalPages?: number
  }
}

/** Item da listagem GET /people — campos opcionais conforme retorno da API */
export interface IPeopleListItem {
  id: number
  name: string
  email?: string
  cpf?: string
  phone?: string
  phoneNumber?: string
  conversionDate?: string
  date?: string
}

/**
 * Detalhe para edição — mesmo contrato do POST + id.
 * Se a API devolver objetos aninhados, use `normalizePeopleDetailFromApi`.
 */
export interface IPeopleDetail extends IPeopleCreatePayload {
  id: number
}

/** Corpo de atualização — alinhado ao create (PUT /people/:id) */
export type IPeopleUpdatePayload = IPeopleCreatePayload
