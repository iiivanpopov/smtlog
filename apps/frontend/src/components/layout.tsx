import type { ReactNode } from 'react'
import type { Locale } from '@/providers'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useI18n, useTheme } from '@/providers'
import { I18nText } from './i18n'
import { Button, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from './ui'

export interface LayoutProps {
  children: ReactNode
}

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

export function Layout({ children }: LayoutProps) {
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
                <SelectItem key={locale.value}value={locale.value}>
                  {locale.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {children}
    </div>
  )
}
