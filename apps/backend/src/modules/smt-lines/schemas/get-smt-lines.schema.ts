import { z } from 'zod'
import { paginationLimitValidator, paginationPageValidator } from '@/shared'

export const GetSMTLinesSchema = z.object({
  page: paginationPageValidator,
  limit: paginationLimitValidator,
})

export type GetSMTLinesData = z.infer<typeof GetSMTLinesSchema>
