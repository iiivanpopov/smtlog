import type { UserDTO } from '@smtlog/backend'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getSessionQueryOptions } from '@/api'
import { config } from '@/config'
import { queryClient } from '@/providers'

export interface RouteContext {
  user?: UserDTO
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Outlet,
  beforeLoad: async () => {
    const sessionToken = localStorage.getItem(config.localStorage.sessionToken)
    if (!sessionToken)
      return undefined

    const response = await queryClient.fetchQuery(getSessionQueryOptions({
      options: { staleTime: 1000 * 60 * 10, gcTime: 1000 * 60 * 30 },
    }))

    return response.user
  },
})
