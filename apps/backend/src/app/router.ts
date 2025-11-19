import { factory } from '@/lib'
import { authRouter, dictionaryRouter, settingsRouter, usersRouter } from '@/modules'

const router = factory.createApp()

router.route('/auth', authRouter)
router.route('/settings', settingsRouter)
router.route('/dictionary', dictionaryRouter)
router.route('/users', usersRouter)

export { router }
