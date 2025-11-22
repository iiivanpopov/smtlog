import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { DeleteUserData, GetUsersData, UserDTO } from '@smtlog/backend'
import type { ApiResponse } from '@/api'
import { $api } from '@/api'

export type GetUsersResponse = ApiResponse<{ users: UserDTO[], meta: { total: number } }>
export const getUsers: ApiFetchesRequest<GetUsersData, FetchesResponse<GetUsersResponse>> = ({ params, config }) => $api.get('/users', { ...config, query: params })

export type DeleteUserResponse = ApiResponse
export const deleteUser: ApiFetchesRequest<DeleteUserData, FetchesResponse<DeleteUserResponse>> = ({ params, config }) => $api.delete(`/users/${params.id}`, config)
