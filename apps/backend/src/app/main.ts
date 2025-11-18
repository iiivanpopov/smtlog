import { Hono } from 'hono'
import { cors as corsMiddleware } from 'hono/cors'
import { errorMiddleware, loggerMiddleware } from '@/middleware'
import { router } from './router'
import '@/database'

const app = new Hono()

app.use(corsMiddleware())
app.use(loggerMiddleware())

app.all('/health', c => c.text('ok'))

app.route('/', router)

app.onError(errorMiddleware())

export default app
