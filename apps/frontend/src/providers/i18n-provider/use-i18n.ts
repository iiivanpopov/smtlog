import { use } from 'react'
import { useIntl } from 'react-intl'
import { I18nContext } from './i18n-context'

export function useI18n() {
  const context = use(I18nContext)
  const intl = useIntl()

  const t = <T extends string | { message?: string }>(
    id?: T,
    values?: Record<string, string | number>,
  ): T extends string ? string : { message?: string } => {
    if (typeof id === 'object' && id?.message)
      return { ...id, message: intl.formatMessage({ id: id.message }, values) } as any

    if (typeof id === 'string' && id.length > 0)
      return intl.formatMessage({ id }, values) as any

    return '' as any
  }

  return {
    t,
    ...context,
  }
}
