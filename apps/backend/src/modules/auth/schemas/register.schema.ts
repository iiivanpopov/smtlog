import { z } from 'zod'
import { userCodeValidator, userNameValidator } from '@/shared'

export const RegisterSchema = z.object({
  name: userNameValidator,
  code: userCodeValidator,
})

export type RegisterData = z.infer<typeof RegisterSchema>
