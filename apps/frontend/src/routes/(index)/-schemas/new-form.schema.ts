import { z } from 'zod'

export const NewFormSchema = z.object({
  board: z.string().nonempty('validation.non-empty'),
  count: z.coerce.number('validation.number').min(1, 'validation.new-form.count.min').default(1),
  // comment: z.string().optional(),
  // timeEnd: z.date(),
  // timeStart: z.date(),
})

export type NewFormData = z.infer<typeof NewFormSchema>

export const newFormDefaultValues: NewFormData = {
  board: '',
  count: 1,
  // comment: undefined,
  // timeEnd: new Date(),
  // timeStart: new Date(),
}
