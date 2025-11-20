import type { ClassValue } from 'clsx'
import type { Locale } from '@/providers'
import fetches from '@siberiacancode/fetches'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export async function fetchLocale(locale: Locale) {
  const messages = await fetches.get(`/locales/${locale}.json`)

  return messages.data as Record<string, string>
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
