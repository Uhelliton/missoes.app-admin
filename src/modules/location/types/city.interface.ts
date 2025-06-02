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

