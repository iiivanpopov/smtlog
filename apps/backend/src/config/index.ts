import { database } from './database'
import { env } from './env'
import { logger } from './logger'
import { secrets } from './secret'
import { server } from './server'

export const config = {
  env,
  logger,
  server,
  database,
  secrets,
} as const
