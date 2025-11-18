import { pino } from 'pino'
import { env } from './env'

export const logger = {
  level: import.meta.env.LOG_LEVEL ?? env.production ? 'info' : 'debug',
  timestamp: env.development
    ? false
    : pino.stdTimeFunctions.isoTime,
} as const
