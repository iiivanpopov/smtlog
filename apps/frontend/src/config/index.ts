import { apiConfig } from './api'
import { localStorageConfig } from './local-storage'

export const config = {
  localStorage: localStorageConfig,
  api: apiConfig,
} as const
