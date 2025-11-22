import type { DeleteSMTLineData } from '@smtlog/backend'
import type { MutationParams, MutationSettings } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { deleteSMTLine } from '@/api'

export type DeleteSMTLineMutationParams = MutationParams<DeleteSMTLineData>

export function deleteSMTLineMutationOptions(settings: MutationSettings<DeleteSMTLineMutationParams, typeof deleteSMTLine>) {
  return mutationOptions({
    mutationKey: ['deleteSMTLine'],
    mutationFn: ({ params, config }) => deleteSMTLine({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useDeleteSMTLineMutation(settings: MutationSettings<DeleteSMTLineMutationParams, typeof deleteSMTLine>) {
  return useMutation(deleteSMTLineMutationOptions(settings))
}
