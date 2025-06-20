export interface IState {
  id: number
  name: string
}

export interface ICity {
  id: number
  name: string
  stateId: number
  state: IState
}

export interface IDistrict {
  id: number
  name: string
}
