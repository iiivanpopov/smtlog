import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { getUsersQueryOptions } from '@/api'
import { queryClient } from '@/providers'
import { AdminPage } from './-components/admin-page'

export const RouteQuerySchema = z.object({
  page: z
    .number()
    .default(1)
    .transform(value => (value < 1 ? 1 : value)),
})

export const Route = createFileRoute('/admin')({
  component: AdminPage,
  validateSearch: RouteQuerySchema,
  beforeLoad: ({ context }) => {
    if (!context.user?.role)
      throw redirect({ to: '/login' })
    if (context.user?.role === 'user')
      throw redirect({ to: '/' })
  },
  loader: ({ location }) => queryClient.ensureQueryData(getUsersQueryOptions({ limit: 10, page: 1, ...location.search })),
})
