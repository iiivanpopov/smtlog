import { z } from 'zod'
import { smtLinePcbSideValidator } from '@/shared'

export const GetSMTLinesSummarySchema = z.object({
  pcb: z.string(),
  side: smtLinePcbSideValidator,
  dateRangeFrom: z.coerce.date(),
  dateRangeTo: z.coerce.date(),
})

export type GetSMTLinesSummaryData = z.infer<typeof GetSMTLinesSummarySchema>
