import { z } from 'zod'
import {
  smtLineBoardValidator,
  smtLineCommentValidator,
  smtLineCountValidator,
  smtLineFirstMPcbValidator,
  smtLineFirstPcbValidator,
  smtLineLastMPcbValidator,
  smtLineLastPcbValidator,
  smtLinePcbSideValidator,
  smtLineSegmentsCountValidator,
  smtLineTimeEndValidator,
  smtLineTimeStartValidator,
} from '@/shared'

export const CreateSMTLineSchema = z.object({
  board: smtLineBoardValidator,
  count: smtLineCountValidator,
  comment: smtLineCommentValidator,
  timeStart: smtLineTimeStartValidator,
  timeEnd: smtLineTimeEndValidator,
  firstMPcb: smtLineFirstMPcbValidator,
  firstPcb: smtLineFirstPcbValidator,
  lastMPcb: smtLineLastMPcbValidator,
  lastPcb: smtLineLastPcbValidator,
  pcbSide: smtLinePcbSideValidator,
  segmentsCount: smtLineSegmentsCountValidator,
})

export type CreateSMTLineData = z.infer<typeof CreateSMTLineSchema>
