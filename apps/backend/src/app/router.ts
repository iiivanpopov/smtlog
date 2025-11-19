import { Hono } from 'hono'
import { authRouter, dictionaryRouter, settingsRouter } from '@/modules'

const router = new Hono()

router.route('/auth', authRouter)
router.route('/settings', settingsRouter)
router.route('/dictionary', dictionaryRouter)

export { router }
