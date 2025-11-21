/* eslint-disable react-refresh/only-export-components */
import type { ErrorRouteComponent } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router'
import { config } from '@/config'
import { I18nText } from './i18n'
import { Button } from './ui'

export interface ErrorPageProps {
  error: Error
  reset: () => void
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="text-5xl font-bold">
        <I18nText id="title.unexpected-error" />
      </span>
      {error.message && <span className="text-3xl font-bold">{error.message}</span>}
      <div className="mt-4 flex gap-4">
        <Button onClick={() => reset()}>
          <I18nText id="action.refresh" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem(config.localStorage.sessionToken)
            router.invalidate()
          }}
        >
          <I18nText id="action.logout" />
        </Button>
      </div>
    </div>
  )
}

export const errorPageHandler: ErrorRouteComponent = payload => <ErrorPage {...payload} />
