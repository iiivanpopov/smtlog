import { createFileRoute, redirect } from '@tanstack/react-router'
import { getDictionaryOptions, getSMTLinesOptions } from '@/api'
import { queryClient } from '@/providers'
import { NewPage } from './-components/new-page'

export const Route = createFileRoute('/(index)/')({
  component: NewPage,
  beforeLoad: ({ context }) => {
    if (!context.user?.role)
      throw redirect({ to: '/login' })
    if (context.user?.role === 'admin')
      throw redirect({ to: '/admin' })
  },
  loader: () => [
    queryClient.ensureQueryData(getSMTLinesOptions({ limit: 10, page: 1 })),
    queryClient.ensureQueryData(getDictionaryOptions({ options: { staleTime: 5 * 60 * 1000 } })),
  ],
})
