import type { MutationParams, MutationSettings } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { logout } from '@/api'

export type LogoutMutationParams = MutationParams<undefined>

export function logoutMutationOptions(settings: MutationSettings<LogoutMutationParams, typeof logout>) {
  return mutationOptions({
    mutationKey: ['logout'],
    mutationFn: (params?: LogoutMutationParams) => logout({ config: { ...settings.config, ...params?.config } }),
    ...settings.options,
  })
}

export function useLogoutMutation(settings: MutationSettings<LogoutMutationParams, typeof logout> = {}) {
  return useMutation(logoutMutationOptions(settings))
}
