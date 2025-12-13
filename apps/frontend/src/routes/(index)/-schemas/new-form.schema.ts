import { z } from 'zod'

export const NewFormSchema = z.object({
  board: z.string().nonempty('validation.non-empty'),
  count: z.coerce.number('validation.number').min(1, 'validation.new-form.count.min').default(1),
  comment: z.string(),
  timestampStart: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
  timestampEnd: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
  firstMPcb: z.coerce.number().int().min(1),
  firstPcb: z.coerce.number().int().min(1),
  lastMPcb: z.coerce.number().int().min(1),
  lastPcb: z.coerce.number().int().min(1),
  pcbSide: z.enum(['T', 'B']),
  donePerShift: z.coerce.number().int().min(1),
  segmentsCount: z.coerce.number().int().min(1),
})

export type NewFormData = z.infer<typeof NewFormSchema>

export const newFormDefaultValues: NewFormData = {
  board: '',
  count: 1,
  comment: '',
  timestampStart: { date: null, time: '' },
  timestampEnd: { date: null, time: '' },
  firstMPcb: 0,
  firstPcb: 0,
  lastMPcb: 0,
  lastPcb: 0,
  pcbSide: 'T',
  donePerShift: 0,
  segmentsCount: 0,
}
