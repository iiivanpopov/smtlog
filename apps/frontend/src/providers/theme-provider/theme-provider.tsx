import type { ReactNode, SetStateAction } from 'react'
import type { Theme } from './theme-context'

import { createContext, useState } from 'react'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  initialTheme: Theme
  children: ReactNode
}

export function ThemeProvider({ initialTheme, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const setThemePatched = (newTheme: SetStateAction<Theme>) => {
    setTheme((current) => {
      const nextTheme = typeof newTheme === 'function' ? newTheme(current) : newTheme
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(nextTheme)
      return nextTheme
    })
  }

  return <ThemeContext value={{ theme, setTheme: setThemePatched }}>{children}</ThemeContext>
}
