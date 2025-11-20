import { z } from 'zod'
import { userCodeValidator } from '@/lib'

export const LoginFormSchema = z.object({
  code: userCodeValidator,
})

export type LoginFormData = z.infer<typeof LoginFormSchema>

export const loginFormDefaultValues: LoginFormData = {
  code: '',
}
