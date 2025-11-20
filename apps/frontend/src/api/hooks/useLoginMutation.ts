import type { LoginParams, MutationParams, MutationSettings } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api'

export type LoginMutationParams = MutationParams<LoginParams>

export function useLoginMutation(settings: MutationSettings<LoginMutationParams, typeof login>) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ params, config }) => login({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}
