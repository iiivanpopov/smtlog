import type { ReactNode, SetStateAction } from 'react'
import type { Locale } from './i18n-context'
import { useState } from 'react'
import { IntlProvider } from 'react-intl'
import { config } from '@/config'
import { fetchLocale } from '@/lib'
import { I18nContext } from './i18n-context'

export interface I18nProviderProps {
  initialLocale: Locale
  initialMessages: Record<string, string>
  children: ReactNode
}

export function I18nProvider({ initialLocale, initialMessages, children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [messages, setMessages] = useState<Record<string, string>>(initialMessages)

  const setLocalePatched = async (newLocale: SetStateAction<Locale>) => {
    const nextLocale = typeof newLocale === 'function' ? newLocale(locale) : newLocale
    localStorage.setItem(config.localStorage.locale, nextLocale)
    const messages = await fetchLocale(nextLocale)
    setMessages(messages)
    setLocale(nextLocale)
  }

  return (
    <I18nContext value={{ locale, setLocale: setLocalePatched }}>
      <IntlProvider messages={messages} locale={locale} defaultLocale={initialLocale}>
        {children}
      </IntlProvider>
    </I18nContext>
  )
}
