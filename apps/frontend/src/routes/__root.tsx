import type { UserDTO } from '@/api'
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

    return queryClient.fetchQuery(getSessionQueryOptions())
      .then(response => ({ user: response.data?.user }))
      .catch(() => {
        localStorage.removeItem(config.localStorage.sessionToken)
        return { user: undefined }
      })
  },
})
