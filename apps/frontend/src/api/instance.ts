import fetches from '@siberiacancode/fetches'
import { toast } from 'sonner'
import { config } from '@/config'

export const $api = fetches.create({
  baseURL: config.api.baseURL,
})

$api.interceptors.request.use((requestConfig) => {
  requestConfig.headers!.Authorization = `Bearer ${localStorage.getItem(config.localStorage.sessionToken)}`
  return requestConfig
})

$api.interceptors.response.use(undefined, (error) => {
  toast(error.response.data?.message ?? error.message ?? 'Unexpected Error')
})
