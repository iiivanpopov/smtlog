import { z } from 'zod'
import { stringToNumberValidator } from '@/shared'

export const GetUsersSchema = z.object({
  search: z.string().trim().optional(),
  page: stringToNumberValidator,
  limit: stringToNumberValidator,
})

export type GetUsersData = z.infer<typeof GetUsersSchema>
