import { use } from 'react'
import { useIntl } from 'react-intl'

import { I18nContext } from './i18n-context'

export function useI18n() {
  const context = use(I18nContext)
  const intl = useIntl()

  const t = (id: string, values?: Record<string, string | number>) => intl.formatMessage({ id }, values)

  return {
    t,
    ...context,
  }
}
