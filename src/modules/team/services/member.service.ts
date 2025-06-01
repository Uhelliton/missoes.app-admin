import http from '@/infra/plugins/http'
import type {IPaginateResponse} from "@/infra/types/http.interfaces";
import type {IMember, IMemberPayload} from "@/modules/team/types/member.interface";
import type {AxiosResponse} from "axios";

export const MemberService = () => {
  const getAll = (): Promise<AxiosResponse<IPaginateResponse<IMember>>> => {
    return  http.get<IPaginateResponse<IMember>>('/members')
  }

  const create = (payload: IMemberPayload): Promise<AxiosResponse<IMember>> => {
    return  http.post<IMember>('/members', payload)
  }

  return { getAll, create }
}
