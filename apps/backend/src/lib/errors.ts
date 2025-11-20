import { HTTPException } from 'hono/http-exception'

interface HTTPExceptionOptions {
  res?: Response
  message?: string
  cause?: unknown
}

export class ApiException extends HTTPException {
  static BadRequest(message: string = 'Bad Request', options?: Omit<HTTPExceptionOptions, 'message'>) {
    return new HTTPException(400, { message, ...options })
  }

  static Unauthorized(message: string = 'Unauthorized', options?: Omit<HTTPExceptionOptions, 'message'>) {
    return new HTTPException(401, { message, ...options })
  }

  static Forbidden(message: string = 'Forbidden', options?: Omit<HTTPExceptionOptions, 'message'>) {
    return new HTTPException(403, { message, ...options })
  }

  static NotFound(message: string = 'Not Found', options?: Omit<HTTPExceptionOptions, 'message'>) {
    return new HTTPException(404, { message, ...options })
  }

  static InternalServerError(message: string = 'Internal Server Error', options?: Omit<HTTPExceptionOptions, 'message'>) {
    return new HTTPException(500, { message, ...options })
  }
}
