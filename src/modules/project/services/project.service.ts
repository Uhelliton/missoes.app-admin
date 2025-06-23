import http from '@/infra/plugins/http'
import type { AxiosResponse } from 'axios'
import type { IProject } from '@/modules/project/types/project.interface'

export const ProjectService = () => {
  const getProjectActive = (): Promise<AxiosResponse<IProject>> => {
    return http.get<IProject>('/projects/active')
  }

  return { getProjectActive }
}
