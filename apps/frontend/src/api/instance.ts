import fetches from '@siberiacancode/fetches'

import { config } from '@/config'

export const $api = fetches.create({
  baseURL: config.api.baseURL,
})

$api.interceptors.request.use((requestConfig) => {
  requestConfig.headers!.Authorization = `Bearer ${localStorage.getItem(config.localStorage.sessionToken)}`
  return requestConfig
})
