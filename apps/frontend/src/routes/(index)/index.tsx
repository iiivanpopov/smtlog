import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { getDictionaryOptions, getSMTLinesOptions } from '@/api'
import { queryClient } from '@/providers'
import { NewPage } from './-components/new-page'

export const RouteQuerySchema = z.object({
  page: z.number().default(0),
})

export const Route = createFileRoute('/(index)/')({
  component: NewPage,
  validateSearch: RouteQuerySchema,
  beforeLoad: ({ context }) => {
    if (!context.user?.role)
      throw redirect({ to: '/login' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
  },
  loader: ({ location }) => [
    queryClient.ensureQueryData(getSMTLinesOptions({ limit: 10, page: 0, ...location.search })),
    queryClient.ensureQueryData(getDictionaryOptions({ options: { staleTime: 5 * 60 * 1000 } })),
  ],
})
