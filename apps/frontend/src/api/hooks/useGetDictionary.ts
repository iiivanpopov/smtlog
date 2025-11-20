import type { QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getDictionary } from '@/api'

export function getDictionaryOptions(settings?: QuerySettings<typeof getDictionary>) {
  return queryOptions({
    queryKey: ['getDictionary'],
    queryFn: () => getDictionary({ config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetDictionary(settings?: QuerySettings<typeof getDictionary>) {
  return useQuery(getDictionaryOptions(settings))
}
