import { z } from 'zod'
import { stringToNumberValidator } from '@/shared'

export const GetUsersSchema = z.object({
  search: z.string().optional(),
  page: stringToNumberValidator.default(0),
  limit: stringToNumberValidator.default(10),
})

export type GetUsersData = z.infer<typeof GetUsersSchema>
