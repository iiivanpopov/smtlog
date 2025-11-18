import { pino } from 'pino'
import { config } from '@/config'

export const logger = pino({
  level: config.logger.level,
  timestamp: config.logger.timestamp,
  transport: config.env.development
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
})
