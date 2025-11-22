import type { RequestOptions } from '@siberiacancode/fetches'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { AnyFunction } from '@/types'

export interface QuerySettings<Func extends AnyFunction = AnyFunction> {
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey' | 'queryFn'
  >
  config?: RequestOptions
}

export interface MutationSettings<Params = void, Func extends AnyFunction = AnyFunction> {
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<Func>>,
      any,
      Params,
      any
    >,
    'mutationKey' | 'mutationFn'
  >
  config?: RequestOptions
}
export type MutationParams<T> = T extends undefined
  ? { config?: RequestOptions } | void
  : { config?: RequestOptions, params: T }

export type ApiResponse<T = undefined> = T extends undefined ? {
  success: true
} : T & {
  success: true
}

export interface UserDTO {
  id: number
  role: 'admin' | 'user'
  name: string
  createdAt: Date
}

export interface SMTLineDTO {
  id: number
  userId: number | null
  board: string
  comment: string | null
  count: number
  timeStart: Date
  timeEnd: Date
  createdAt: Date
}

export interface GetSettingData {
  key: string
}

export interface SetSettingData {
  key: string
  value: string
}

export interface LoginData {
  code: string
}

export interface RegisterData {
  name: string
  code: string
}

export interface CreateSMTLineData {
  board: string
  count: number
  comment?: string | null
  timeStart: number
  timeEnd: number
}

export interface DeleteSMTLineData {
  id: number
}

export interface GetSMTLinesData {
  page: number
  limit: number
}

export interface DeleteUserData {
  id: number
}

export interface GetUsersData {
  search?: string
  page: number
  limit: number
}
