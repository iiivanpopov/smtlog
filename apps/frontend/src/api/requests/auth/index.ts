import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { UserDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export interface LoginParams {
  code: string
}
export type LoginResponse = ApiResponse<{ token: string }>
export const login: ApiFetchesRequest<LoginParams, FetchesResponse<LoginResponse>> = ({ params, config }) => $api.post('/auth/login', params, config)

export type GetSessionResponse = ApiResponse<{ user: UserDTO }>
export const getSession: ApiFetchesRequest<undefined, FetchesResponse<GetSessionResponse>> = ({ config } = {}) => $api.get('/auth/session', config)
