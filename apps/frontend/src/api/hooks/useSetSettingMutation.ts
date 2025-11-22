import type { MutationParams, MutationSettings, SetSettingData } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { setSetting } from '@/api'

export type SetSettingMutationParams = MutationParams<SetSettingData>

export function SetSettingMutationOptions(settings: MutationSettings<SetSettingMutationParams, typeof setSetting>) {
  return mutationOptions({
    mutationKey: ['setSetting'],
    mutationFn: ({ params, config }) => setSetting({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useSetSettingMutation(settings: MutationSettings<SetSettingMutationParams, typeof setSetting> = {}) {
  return useMutation(SetSettingMutationOptions(settings))
}
