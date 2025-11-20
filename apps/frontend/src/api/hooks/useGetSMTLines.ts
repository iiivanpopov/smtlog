import type { GetSMTLinesParams } from '../requests/smt-lines'
import type { QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSMTLines } from '../requests/smt-lines'

export function getSMTLinesOptions(params: GetSMTLinesParams, settings?: QuerySettings<typeof getSMTLines>) {
  return queryOptions({
    queryKey: ['getSMTLines', params],
    queryFn: () => getSMTLines({ params, config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetSMTLines(params: GetSMTLinesParams, settings?: QuerySettings<typeof getSMTLines>) {
  return useQuery(getSMTLinesOptions(params, settings))
}
