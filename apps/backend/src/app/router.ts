import { Hono } from 'hono'
import { authRouter, settingsRouter } from '@/modules'

const router = new Hono()

router.route('/auth', authRouter)
router.route('/settings', settingsRouter)

export { router }
