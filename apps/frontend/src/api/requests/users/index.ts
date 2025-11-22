import type { ApiFetchesRequest, FetchesResponse } from '@siberiacancode/fetches'
import type { ApiResponse, DeleteUserData, GetUsersData, UserDTO } from '@/api'
import { $api } from '@/api'

export type GetUsersResponse = ApiResponse<{ users: UserDTO[], meta: { total: number } }>
export const getUsers: ApiFetchesRequest<GetUsersData, FetchesResponse<GetUsersResponse>> = ({ params, config }) => $api.get('/users', { ...config, query: { ...params } })

export type DeleteUserResponse = ApiResponse
export const deleteUser: ApiFetchesRequest<DeleteUserData, FetchesResponse<DeleteUserResponse>> = ({ params, config }) => $api.delete(`/users/${params.id}`, config)
