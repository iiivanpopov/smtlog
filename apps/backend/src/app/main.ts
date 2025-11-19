import { cors as corsMiddleware } from 'hono/cors'
import { factory } from '@/lib'
import { errorMiddleware, loggerMiddleware } from '@/middleware'
import { router } from './router'

const app = factory.createApp()

app.use(corsMiddleware())
app.use(loggerMiddleware())

app.all('/health', c => c.text('ok'))

app.route('/', router)

app.onError(errorMiddleware())

export default app
