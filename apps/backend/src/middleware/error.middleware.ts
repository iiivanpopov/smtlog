import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { config } from '@/config'
import { logger } from '@/lib'

export function errorMiddleware(): ErrorHandler {
  return (err, c) => {
    const stack = config.env.development ? err.stack : undefined

    if (err instanceof HTTPException) {
      return c.json({
        message: err.message,
        success: false,
        stack,
      }, err.status)
    }

    logger.error(err)

    return c.json({
      message: 'Internal Server Error',
      success: false,
      stack,
    }, 500)
  }
}
