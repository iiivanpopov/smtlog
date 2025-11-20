import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { SMTLineDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export interface GetSMTLinesParams {
  page: number
  limit: number
}

export type GetSMTLinesResponse = ApiResponse<{ smtLines: SMTLineDTO[] }>
export const getSMTLines: ApiFetchesRequest<GetSMTLinesParams, FetchesResponse<GetSMTLinesResponse>> = ({ params, config }) =>
  $api.get('/smt-lines', { ...config, query: { ...params } })
