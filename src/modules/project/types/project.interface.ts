import type { ICity } from '@/modules/location/types/city.interface'

export interface IProject {
  id: number
  name: string
  description: string
  year: number
  isActive: boolean
  city: ICity
}
