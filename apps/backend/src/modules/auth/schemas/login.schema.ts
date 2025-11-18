import { z } from 'zod'
import { codeValidator } from '@/shared'

export const LoginSchema = z.object({
  code: codeValidator,
})

export type LoginData = z.infer<typeof LoginSchema>
