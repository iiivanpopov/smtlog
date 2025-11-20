import { z } from 'zod'
import { smtLineBoardValidator, smtLineCommentValidator, smtLineCountValidator, smtLineTimeEndValidator, smtLineTimeStartValidator } from '@/shared'

export const CreateSMTLineSchema = z.object({
  board: smtLineBoardValidator,
  count: smtLineCountValidator,
  comment: smtLineCommentValidator,
  timeStart: smtLineTimeStartValidator,
  timeEnd: smtLineTimeEndValidator,
})

export type CreateSMTLineData = z.infer<typeof CreateSMTLineSchema>
