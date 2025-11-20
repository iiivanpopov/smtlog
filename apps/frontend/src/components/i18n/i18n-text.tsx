import { FormattedMessage } from 'react-intl'

export interface I18nTextProps {
  id: string
  values?: Record<string, any>
}

export function I18nText({ id, values }: I18nTextProps) {
  return <FormattedMessage id={id} values={values} />
}
