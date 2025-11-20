import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from './-components/login-page'

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
    if (context.user?.role === 'user')
      throw redirect({ to: '/' })
  },
})
