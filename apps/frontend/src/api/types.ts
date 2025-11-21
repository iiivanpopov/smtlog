import type { RequestOptions } from '@siberiacancode/fetches'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { AnyFunction } from '@/types'

export interface QuerySettings<
  Func extends AnyFunction = AnyFunction,
> {
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

export interface MutationSettings<
  Params = void,
  Func extends AnyFunction = AnyFunction,
> {
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
