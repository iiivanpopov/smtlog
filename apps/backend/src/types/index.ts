declare module 'hono/http-exception' {
  export interface HTTPExceptionOptions {
    res?: Response
    message?: string
    cause?: unknown
  }
}
