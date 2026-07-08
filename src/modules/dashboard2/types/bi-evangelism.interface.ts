export interface ISummaryData {
  total: number
  courses: number
  cells: number
  decision: number
}

export interface ISummaryEvangelismDaily extends ISummaryData {
  date: string
}

export interface ISummaryEvangelismDistrict {
  district: string
  total: number
}

export interface ISummaryEvangelismTeam extends ISummaryData {
  team: string
}
