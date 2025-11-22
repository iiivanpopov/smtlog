import { z } from 'zod'
import { userCodeValidator } from '@/lib'

export const RegisterFormSchema = z.object({
  code: userCodeValidator,
  name: z
    .string()
    .min(2, 'validation.user.name.min')
    .max(64, 'validation.user.name.max')
    .transform(v => v.trim().replace(/\s+/g, ' ')),
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>

export const registerFormDefaultValues: RegisterFormData = {
  code: '',
  name: '',
}
