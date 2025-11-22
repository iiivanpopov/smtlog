import type { CreateSMTLineData } from '@smtlog/backend'
import type { MutationParams, MutationSettings } from '@/api'
import { mutationOptions, useMutation } from '@tanstack/react-query'
import { createSMTLine } from '@/api'

export type CreateSMTLineMutationParams = MutationParams<CreateSMTLineData>

export function CreateSMTLineMutationOptions(settings: MutationSettings<CreateSMTLineMutationParams, typeof createSMTLine>) {
  return mutationOptions({
    mutationKey: ['createSMTLine'],
    mutationFn: ({ params, config }) => createSMTLine({ params, config: { ...settings.config, ...config } }),
    ...settings.options,
  })
}

export function useCreateSMTLineMutation(settings: MutationSettings<CreateSMTLineMutationParams, typeof createSMTLine> = {}) {
  return useMutation(CreateSMTLineMutationOptions(settings))
}
