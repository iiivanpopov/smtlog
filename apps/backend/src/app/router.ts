import { factory } from '@/lib'
import { authRouter, dictionaryRouter, settingsRouter } from '@/modules'

const router = factory.createApp()

router.route('/auth', authRouter)
router.route('/settings', settingsRouter)
router.route('/dictionary', dictionaryRouter)

export { router }
