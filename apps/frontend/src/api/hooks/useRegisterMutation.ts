import type { MutationParams, MutationSettings, RegisterData } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { register } from '@/api'

export type RegisterMutationParams = MutationParams<RegisterData>

export function registerMutationOptions(settings: MutationSettings<RegisterMutationParams, typeof register>) {
  return mutationOptions({
    mutationKey: ['register'],
    mutationFn: ({ params, config }) => register({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useRegisterMutation(settings: MutationSettings<RegisterMutationParams, typeof register> = {}) {
  return useMutation(registerMutationOptions(settings))
}
