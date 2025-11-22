import type { DeleteUserData } from '@smtlog/backend'
import type { MutationParams, MutationSettings } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { deleteUser } from '@/api'

export type DeleteUserMutationParams = MutationParams<DeleteUserData>

export function deleteUserMutationOptions(settings: MutationSettings<DeleteUserMutationParams, typeof deleteUser>) {
  return mutationOptions({
    mutationKey: ['deleteUser'],
    mutationFn: ({ params, config }) => deleteUser({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useDeleteUserMutation(settings: MutationSettings<DeleteUserMutationParams, typeof deleteUser>) {
  return useMutation(deleteUserMutationOptions(settings))
}
