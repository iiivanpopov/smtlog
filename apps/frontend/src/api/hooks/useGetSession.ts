import type { QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSession } from '@/api'

export function getSessionQueryOptions(settings?: QuerySettings<typeof getSession>) {
  return queryOptions({
    queryKey: ['getSession'],
    queryFn: () => getSession({ config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetSessionQuery(settings?: QuerySettings<typeof getSession>) {
  return useQuery({
    queryKey: ['getSession'],
    queryFn: () => getSession({ config: settings?.config }),
    ...settings?.options,
  })
}
