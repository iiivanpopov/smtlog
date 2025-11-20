import { z } from 'zod'
import { stringToNumberValidator } from '@/shared'

export const DeleteSMTLineSchema = z.object({
  id: stringToNumberValidator,
})

export type DeleteSMTLineData = z.infer<typeof DeleteSMTLineSchema>
