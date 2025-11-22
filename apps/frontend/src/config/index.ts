import { apiConfig } from './api'
import { localStorageConfig } from './local-storage'
import { settingsConfig } from './settings'

export const config = {
  localStorage: localStorageConfig,
  api: apiConfig,
  settings: settingsConfig,
} as const
