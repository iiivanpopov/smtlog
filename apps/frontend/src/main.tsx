import type { Locale, Theme } from '@/providers'

import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'

import { LOCAL_STORAGE } from '@/config'
import { fetchLocale } from '@/lib'
import { I18nProvider, ThemeProvider } from '@/providers'
import { routeTree } from '@/routeTree.gen'
import '@/styles/index.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const initialTheme: Theme = localStorage.getItem(LOCAL_STORAGE.theme) as Theme ?? 'light'
document.documentElement.classList.add(initialTheme)

const initialLocale: Locale = localStorage.getItem(LOCAL_STORAGE.locale) as Locale ?? 'en-US'
document.documentElement.setAttribute('lang', initialLocale)
const initialMessages = await fetchLocale(initialLocale)

createRoot(document.getElementById('root')!).render(
  <I18nProvider initialLocale={initialLocale} initialMessages={initialMessages}>
    <ThemeProvider initialTheme={initialTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </I18nProvider>,
)
