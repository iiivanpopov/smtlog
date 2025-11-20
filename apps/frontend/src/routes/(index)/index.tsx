import { createFileRoute, redirect } from '@tanstack/react-router'
import { getSMTLinesOptions } from '@/api'
import { queryClient } from '@/providers'
import { NewPage } from './-components/new-page'
import { RouteQuerySchema } from './-schemas/route-query.schema'

export const Route = createFileRoute('/(index)/')({
  component: NewPage,
  beforeLoad: ({ context }) => {
    if (!context.user?.role)
      throw redirect({ to: '/login' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
  },
  validateSearch: RouteQuerySchema,
  loader: ({ location }) => queryClient.ensureQueryData(getSMTLinesOptions({
    limit: 10,
    page: 0,
    ...location.search,
  })),
})
