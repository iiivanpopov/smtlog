import type { UserDTO } from '@smtlog/backend'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getSessionQueryOptions } from '@/api'
import { ErrorPage, Layout, LoadingPage, NotFoundPage } from '@/components'
import { config } from '@/config'
import { queryClient } from '@/providers'

export interface RouteContext {
  user?: UserDTO
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RouteComponent,
  errorComponent: ErrorPage,
  pendingComponent: LoadingPage,
  notFoundComponent: NotFoundPage,
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

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
