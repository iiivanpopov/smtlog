import type { LoginData, MutationParams, MutationSettings } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { login } from '@/api'

export type LoginMutationParams = MutationParams<LoginData>

export function loginMutationOptions(settings: MutationSettings<LoginMutationParams, typeof login>) {
  return mutationOptions({
    mutationKey: ['login'],
    mutationFn: ({ params, config }) => login({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useLoginMutation(settings: MutationSettings<LoginMutationParams, typeof login> = {}) {
  return useMutation(loginMutationOptions(settings))
}
