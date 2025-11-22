import type { GetUsersData } from '@smtlog/backend'
import type { QuerySettings } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api'

export function getUsersQueryOptions(params: GetUsersData, settings?: QuerySettings<typeof getUsers>) {
  return queryOptions({
    queryKey: ['getUsers', params],
    queryFn: () => getUsers({ params, config: settings?.config }),
    ...settings?.options,
  })
}

export function useGetUsersQuery(params: GetUsersData, settings?: QuerySettings<typeof getUsers>) {
  return useQuery(getUsersQueryOptions(params, settings))
}
