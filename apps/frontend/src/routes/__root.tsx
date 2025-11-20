import type { UserDTO } from '@smtlog/backend'
import type { Locale } from '@/providers'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { MoonIcon, SunIcon } from 'lucide-react'
import { getSessionQueryOptions } from '@/api'
import { Button, I18nText, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components'
import { config } from '@/config'
import { queryClient, useI18n, useTheme } from '@/providers'

export interface RouteContext {
  user?: UserDTO
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  beforeLoad: async () => {
    const sessionToken = localStorage.getItem(config.localStorage.sessionToken)
    if (!sessionToken)
      return undefined

    const response = await queryClient.fetchQuery(getSessionQueryOptions({
      options: { staleTime: 1000 * 60 * 10, gcTime: 1000 * 60 * 30 },
    }))

    return { user: response.data?.user }
  },
})

const LOCALES: {
  value: Locale
  label: string
}[] = [{
  value: 'en-US',
  label: 'English',
}, {
  value: 'uk-UA',
  label: 'Українська',
}, {
  value: 'ru-RU',
  label: 'Русский',
}]

function RouteComponent() {
  const theme = useTheme()
  const i18n = useI18n()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex gap-4 my-4 w-[350px]">
        <Button size="icon" variant="outline" onClick={theme.toggle}>
          {theme.value === 'dark' && <MoonIcon />}
          {theme.value === 'light' && <SunIcon />}
        </Button>
        <Select value={i18n.locale} onValueChange={value => i18n.setLocale(value as Locale)}>
          <SelectTrigger>
            {LOCALES.find(locale => locale.value === i18n.locale)!.label}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <I18nText id="field.locale.label" />
              </SelectLabel>
              {LOCALES.map(locale => (
                <SelectItem
                  key={locale.value}
                  value={locale.value}
                >
                  {locale.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Outlet />
    </div>
  )
}

function ErrorComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="text-5xl font-bold">
        <I18nText id="title.unexpected-error" />
      </span>
      <div className="flex gap-4">
        <Button
          className="mt-4"
          onClick={() => location.reload()}
        >
          <I18nText id="action.refresh" />
        </Button>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => location.href = '/'}
        >
          <I18nText id="action.go-home" />
        </Button>
      </div>
    </div>
  )
}
