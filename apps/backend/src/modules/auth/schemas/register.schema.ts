import { z } from 'zod'
import { codeValidator, nameValidator } from '@/shared'

export const RegisterSchema = z.object({
  name: nameValidator,
  code: codeValidator,
})

export type RegisterData = z.infer<typeof RegisterSchema>
