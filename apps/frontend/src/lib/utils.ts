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

export function startViewTransition(callback: () => void) {
  if (document.startViewTransition)
    document.startViewTransition(callback)
  else
    callback()
}

export function timeToSeconds(time: string) {
  const [hours = '0', minutes = '0'] = time.split(':')
  return Number(hours) * 3600 + Number(minutes) * 60
}
