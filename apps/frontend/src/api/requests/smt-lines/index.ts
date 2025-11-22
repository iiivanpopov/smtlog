import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { CreateSMTLineData, GetSMTLinesData, SMTLineDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export type GetSMTLinesResponse = ApiResponse<{ smtLines: SMTLineDTO[], meta: { total: number } }>
export const getSMTLines: ApiFetchesRequest<GetSMTLinesData, FetchesResponse<GetSMTLinesResponse>> = ({ params, config }) => $api.get('/smt-lines/me', { ...config, query: { ...params } })

export type CreateSMTLineResponse = ApiResponse
export const createSMTLine: ApiFetchesRequest<CreateSMTLineData, FetchesResponse<CreateSMTLineResponse>> = ({ params, config }) => $api.post('/smt-lines', params, config)
