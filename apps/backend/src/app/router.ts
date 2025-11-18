import { Hono } from 'hono'
import { authRouter } from '@/modules'

const router = new Hono()

router.route('/auth', authRouter)

export { router }
