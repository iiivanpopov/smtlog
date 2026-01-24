import type { GetSMTLinesSummaryData, QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSMTLinesSummary } from '@/api'

export function getSMTLinesSummaryQueryOptions(params: GetSMTLinesSummaryData, settings?: QuerySettings<typeof getSMTLinesSummary>) {
  return queryOptions({
    queryKey: ['getSMTLinesSummary', params],
    queryFn: () => getSMTLinesSummary({ params, config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetSMTLinesSummaryQuery(params: GetSMTLinesSummaryData, settings?: QuerySettings<typeof getSMTLinesSummary>) {
  return useQuery(getSMTLinesSummaryQueryOptions(params, settings))
}
