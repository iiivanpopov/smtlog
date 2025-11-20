import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(index)/')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.user?.role)
      throw redirect({ to: '/login' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
  },
})

function RouteComponent() {
  return <div>Hello "/new"!</div>
}
