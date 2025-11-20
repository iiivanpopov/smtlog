import type { ApiFetchesRequest } from '@siberiacancode/fetches'
import type { UserDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export interface LoginParams {
  code: string
}
export type LoginResponse = ApiResponse<{ user: UserDTO }>
export const login: ApiFetchesRequest<LoginParams, LoginResponse> = ({ params, config }) => $api.post('/auth/login', params, config)

export type GetSessionResponse = ApiResponse<{ user: UserDTO }>
export const getSession: ApiFetchesRequest<undefined, GetSessionResponse> = ({ config } = {}) => $api.get('/auth/session', config)
