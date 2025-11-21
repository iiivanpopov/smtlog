import { useNavigate } from '@tanstack/react-router'
import { I18nText } from './i18n'
import { Layout } from './layout'
import { Button } from './ui'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-6xl font-bold">
          404
        </p>
        <p className="mt-4 text-5xl font-semibold">
          <I18nText id="title.page-not-found" />
        </p>
        <Button className="mt-4" variant="secondary" onClick={() => navigate({ to: '/' })}>
          <I18nText id="action.go-home" />
        </Button>
      </div>
    </Layout>
  )
}
