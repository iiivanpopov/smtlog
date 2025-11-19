import { cache } from './cache'
import { database } from './database'
import { env } from './env'
import { logger } from './logger'
import { secrets } from './secret'
import { server } from './server'
import { settings } from './settings'

export const config = {
  env,
  logger,
  server,
  database,
  secrets,
  settings,
  cache,
} as const
