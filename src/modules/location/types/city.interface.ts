export interface IState {
  id: number
  name: string
}

export interface ICity {
  id: number
  name: string
  stateId: number
  state: IState
  districts?: Array<IDistrict>
}

export interface IDistrict {
  id: number
  name: string
}
