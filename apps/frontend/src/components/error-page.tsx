import { config } from '@/config'
import { I18nText } from './i18n'
import { Button } from './ui'

export function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="text-5xl font-bold">
        <I18nText id="title.unexpected-error" />
      </span>
      <div className="mt-4 flex gap-4">
        <Button onClick={() => location.reload()}>
          <I18nText id="action.refresh" />
        </Button>
        <Button variant="secondary" onClick={() => location.href = '/'}>
          <I18nText id="action.go-home" />
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            localStorage.removeItem(config.localStorage.sessionToken)
            location.reload()
          }}
        >
          <I18nText id="action.logout" />
        </Button>
      </div>
    </div>
  )
}
