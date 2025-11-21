import { z } from 'zod'

export const NewFormSchema = z.object({
  board: z.string().nonempty('validation.non-empty'),
  count: z.coerce.number('validation.number').min(1, 'validation.new-form.count.min').default(1),
  comment: z.string().optional(),
  timestampStart: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
  timestampEnd: z.object({
    date: z.date().nullable().refine(val => val !== null, 'validation.non-empty'),
    time: z.string().nonempty('validation.non-empty'),
  }),
})

export type NewFormData = z.infer<typeof NewFormSchema>

export const newFormDefaultValues: NewFormData = {
  board: '',
  count: 1,
  comment: undefined,
  timestampStart: { date: null, time: '' },
  timestampEnd: { date: null, time: '' },
}
