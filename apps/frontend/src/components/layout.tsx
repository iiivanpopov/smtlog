import type { ReactNode } from 'react'
import type { Locale } from '@/providers'
import { useRouteContext } from '@tanstack/react-router'
import { MoonIcon, SunIcon, UserIcon } from 'lucide-react'
import { useDisclosure } from '@/hooks'
import { startViewTransition } from '@/lib'
import { useI18n, useTheme } from '@/providers'
import { I18nText } from './i18n'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from './ui'

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
  const logoutDialog = useDisclosure()
  const context = useRouteContext({ from: '__root__' })
  const i18n = useI18n()

  const onThemeChange = () => startViewTransition(theme.toggle)
  const onLogout = () => {}
  const onLocaleChange = (value: string) => i18n.setLocale(value as Locale)

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex gap-4 my-4">

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <UserIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              <I18nText id="logged-in-as" />
              {' '}
              <b>{context.user?.name}</b>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutDialog.open}>
              <I18nText id="action.logout" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={logoutDialog.opened} onOpenChange={logoutDialog.setOpened}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <I18nText id="dialog.logout.title" />
              </DialogTitle>
              <DialogDescription>
                <I18nText id="dialog.logout.description" />
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-4">
              <Button onClick={logoutDialog.close}>
                <I18nText id="action.close" />
              </Button>
              <Button onClick={onLogout} variant="destructive">
                <I18nText id="action.logout" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button size="icon" variant="outline" onClick={onThemeChange}>
          {theme.value === 'dark' && <MoonIcon />}
          {theme.value === 'light' && <SunIcon />}
        </Button>
        <Select value={i18n.locale} onValueChange={onLocaleChange}>
          <SelectTrigger>
            {LOCALES.find(locale => locale.value === i18n.locale)!.label}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                <I18nText id="field.locale.label" />
              </SelectLabel>
              {LOCALES.map(locale => (
                <SelectItem key={locale.value} value={locale.value}>
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
