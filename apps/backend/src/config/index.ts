import { env } from './env'
import { logger } from './logger'
import { server } from './server'

export const config = {
  env,
  logger,
  server,
} as const
