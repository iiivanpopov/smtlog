import { z } from 'zod'
import { stringToNumberValidator } from '@/shared'

export const DeleteUserSchema = z.object({
  id: stringToNumberValidator,
})

export type DeleteUserData = z.infer<typeof DeleteUserSchema>
