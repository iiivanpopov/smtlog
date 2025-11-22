import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { LoginData, RegisterData, UserDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export type LoginResponse = ApiResponse<{ token: string }>
export const login: ApiFetchesRequest<LoginData, FetchesResponse<LoginResponse>> = ({ params, config }) => $api.post('/auth/login', params, config)

export type RegisterResponse = ApiResponse
export const register: ApiFetchesRequest<RegisterData, FetchesResponse<RegisterResponse>> = ({ params, config }) => $api.post('/auth/register', params, config)

export type GetSessionResponse = ApiResponse<{ user: UserDTO }>
export const getSession: ApiFetchesRequest<undefined, FetchesResponse<GetSessionResponse>> = ({ config } = {}) => $api.get('/auth/session', config)

export type LogoutResponse = ApiResponse
export const logout: ApiFetchesRequest<undefined, FetchesResponse<LogoutResponse>> = ({ config } = {}) => $api.post('/auth/logout', undefined, config)
