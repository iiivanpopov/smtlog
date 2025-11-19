import { z } from 'zod'
import { userCodeValidator } from '@/shared'

export const LoginSchema = z.object({
  code: userCodeValidator,
})

export type LoginData = z.infer<typeof LoginSchema>
