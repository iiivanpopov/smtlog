import type { Locale, Theme } from '@/providers'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { config } from '@/config'
import { fetchLocale } from '@/lib'
import { I18nProvider, QueryProvider, ThemeProvider } from '@/providers'
import { routeTree } from './routeTree.gen'
import '@/styles/index.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    user: undefined,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const initialTheme: Theme = localStorage.getItem(config.localStorage.theme) as Theme ?? 'light'
document.documentElement.classList.add(initialTheme)

const initialLocale: Locale = localStorage.getItem(config.localStorage.locale) as Locale ?? 'en-US'
document.documentElement.setAttribute('lang', initialLocale)
const initialMessages = await fetchLocale(initialLocale)

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <I18nProvider initialLocale={initialLocale} initialMessages={initialMessages}>
      <ThemeProvider initialTheme={initialTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nProvider>
  </QueryProvider>,
)
