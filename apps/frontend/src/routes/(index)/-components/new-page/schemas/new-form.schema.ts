import { z } from 'zod'
import { timeToMS } from '@/lib'
import { calculatePerShiftMPcb, calculatePerShiftPcb } from '../utils'

export const NewFormSchema = z.object({
  board: z.string().nonempty('validation.non-empty'),
  comment: z.string(),
  timestampStart: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
  timestampEnd: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
  firstMPcb: z.coerce.number().min(1, 'validation.non-empty'),
  firstPcb: z.coerce.number().min(1, 'validation.non-empty'),
  lastMPcb: z.coerce.number().min(1, 'validation.non-empty'),
  lastPcb: z.coerce.number().min(1, 'validation.non-empty'),
  pcbSide: z.enum(['T', 'B']),
  segmentsCount: z.coerce.number().min(1, 'validation.non-empty'),
}).superRefine((value, ctx) => {
  if (calculatePerShiftMPcb(
    Number(value.lastMPcb),
    Number(value.firstMPcb),
  ) <= 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'validation.last-m-pcb-must-be-greater',
      path: ['lastMPcb'],
    })
  }

  if (calculatePerShiftPcb(
    Number(value.lastPcb),
    Number(value.firstPcb),
    Number(value.segmentsCount),
  ) <= 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'validation.last-pcb-invalid-range',
      path: ['lastPcb'],
    })
  }

  const timeStart = (value.timestampStart?.date?.getTime() ?? 0) + timeToMS(value.timestampStart.time)
  const timeEnd = (value.timestampEnd?.date?.getTime() ?? 0) + timeToMS(value.timestampEnd.time)

  if (timeStart > 0 && timeEnd > 0 && timeEnd <= timeStart) {
    ctx.addIssue({
      code: 'custom',
      message: 'validation.end-time-must-be-after-start',
      path: ['timestampEnd', 'date'],
    })
    ctx.addIssue({
      code: 'custom',
      message: 'validation.end-time-must-be-after-start',
      path: ['timestampEnd', 'time'],
    })
  }
})

export type NewFormData = z.infer<typeof NewFormSchema>

export const newFormDefaultValues: NewFormData = {
  board: '',
  comment: '',
  timestampStart: { date: null, time: '' },
  timestampEnd: { date: null, time: '' },
  firstMPcb: 0,
  firstPcb: 0,
  lastMPcb: 0,
  lastPcb: 0,
  pcbSide: 'T',
  segmentsCount: 0,
}
