import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api'
import { config } from '@/config'
import { loginFormDefaultValues, LoginFormSchema } from '../-schemas/login-form.schema'

export function useLoginPage() {
  const loginForm = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(LoginFormSchema),
  })

  const router = useRouter()

  const loginMutation = useLoginMutation()

  const onLoginFormSubmit = loginForm.handleSubmit(async (data) => {
    const response = await loginMutation.mutateAsync({ params: data })

    localStorage.setItem(config.localStorage.sessionToken, response.data.token)
    router.invalidate()
  })

  return {
    state: { loginForm },
    handlers: { onLoginFormSubmit },
    mutations: { login: loginMutation },
  }
}
