import http from '@/infra/plugins/http'
import type { AxiosResponse } from 'axios'
import type {
  ISummaryData,
  ISummaryEvangelismDaily,
  ISummaryEvangelismDistrict,
  ISummaryEvangelismTeam,
} from '@/modules/dashaboard/types/bi-evangelism.interface'

export const BiEvangelismService = () => {
  const getSummaryData = (query: object = {}): Promise<AxiosResponse<ISummaryData>> => {
    return http.get<ISummaryData>('/bi/evangelism/summary-data', { params: query })
  }

  const getSummaryEvangelismDaily = (query: object = {}): Promise<AxiosResponse<ISummaryEvangelismDaily[]>> => {
    return http.get<ISummaryEvangelismDaily>('/bi/evangelism/summary-daily', { params: query })
  }

  const getSumEvangelismByDistricts = (query: object = {}): Promise<AxiosResponse<ISummaryEvangelismDistrict[]>> => {
    return http.get<ISummaryEvangelismDistrict>('/bi/evangelism/summary-districts', { params: query })
  }

  const getSumEvangelismByTeams = (query: object = {}): Promise<AxiosResponse<ISummaryEvangelismTeam[]>> => {
    return http.get<ISummaryEvangelismTeam>('/bi/evangelism/summary-teams', { params: query })
  }

  return { getSummaryData, getSummaryEvangelismDaily, getSumEvangelismByDistricts, getSumEvangelismByTeams }
}
