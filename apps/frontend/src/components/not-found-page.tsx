import { I18nText } from './i18n'
import { Button } from './ui'

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-6xl font-bold">
        404
      </p>
      <p className="mt-4 text-5xl font-medium">
        <I18nText id="title.page-not-found" />
      </p>
      <Button className="mt-4" variant="secondary" onClick={() => location.href = '/'}>
        <I18nText id="action.go-home" />
      </Button>
    </div>
  )
}
