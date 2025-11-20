import { factory } from '@/lib'
import { authRouter, dictionaryRouter, settingsRouter, smtLinesRouter, usersRouter } from '@/modules'

const router = factory.createApp()

router.route('/auth', authRouter)
router.route('/settings', settingsRouter)
router.route('/dictionary', dictionaryRouter)
router.route('/users', usersRouter)
router.route('/smt-lines', smtLinesRouter)

export { router }
