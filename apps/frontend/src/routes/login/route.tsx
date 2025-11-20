import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
    if (context.user?.role === 'user')
      throw redirect({ to: '/' })
  },
})

function RouteComponent() {
  return <div>Hello "/login"!</div>
}
