import type { Dispatch, SetStateAction } from 'react'
import type { AsyncFunction } from '@/types'
import { createContext } from 'react'

export type Locale = 'en-US' | 'uk-UA' | 'ru-RU'

export interface I18nContextState {
  locale: Locale
  setLocale: AsyncFunction<Dispatch<SetStateAction<Locale>>>
}

export const I18nContext = createContext<I18nContextState>(null!)
