import type { GetSMTLinesData, QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSMTLines } from '@/api'

export function getSMTLinesQueryOptions(params: GetSMTLinesData, settings?: QuerySettings<typeof getSMTLines>) {
  return queryOptions({
    queryKey: ['getSMTLines', params],
    queryFn: () => getSMTLines({ params, config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetSMTLinesQuery(params: GetSMTLinesData, settings?: QuerySettings<typeof getSMTLines>) {
  return useQuery(getSMTLinesQueryOptions(params, settings))
}
