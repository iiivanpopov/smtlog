import { logger as honoLoggerMiddleware } from 'hono/logger'
import { logger } from '@/lib'

export function loggerMiddleware() {
  return honoLoggerMiddleware((message: string) => {
    logger.debug(message)
  })
}
