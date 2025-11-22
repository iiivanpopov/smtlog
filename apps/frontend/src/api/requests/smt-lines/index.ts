import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { ApiResponse, CreateSMTLineData, DeleteSMTLineData, GetSMTLinesData, SMTLineDTO } from '@/api'
import { $api } from '@/api'

export type GetSMTLinesResponse = ApiResponse<{ smtLines: SMTLineDTO[], meta: { total: number } }>
export const getSMTLines: ApiFetchesRequest<GetSMTLinesData, FetchesResponse<GetSMTLinesResponse>> = ({ params, config }) => $api.get('/smt-lines/me', { ...config, query: { ...params } })

export type CreateSMTLineResponse = ApiResponse
export const createSMTLine: ApiFetchesRequest<CreateSMTLineData, FetchesResponse<CreateSMTLineResponse>> = ({ params, config }) => $api.post('/smt-lines', params, config)

export type DeleteSMTLineResponse = ApiResponse
export const deleteSMTLine: ApiFetchesRequest<DeleteSMTLineData, FetchesResponse<DeleteSMTLineResponse>> = ({ params, config }) => $api.delete(`/smt-lines/${params.id}`, config)
