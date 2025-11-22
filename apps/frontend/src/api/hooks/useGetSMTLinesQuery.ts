import type { GetSMTLinesData } from '@smtlog/backend'
import type { QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSMTLines } from '@/api'

export function getSMTLinesOptions(params: GetSMTLinesData, settings?: QuerySettings<typeof getSMTLines>) {
  return queryOptions({
    queryKey: ['getSMTLines', params],
    queryFn: () => getSMTLines({ params, config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetSMTLines(params: GetSMTLinesData, settings?: QuerySettings<typeof getSMTLines>) {
  return useQuery(getSMTLinesOptions(params, settings))
}
