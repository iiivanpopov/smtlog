import { factory } from '@/lib'
import { sessionMiddleware } from '@/middleware'
import { wrapSuccess } from '@/shared'
import { getDictionary } from './dictionary.service'

const dictionaryRouter = factory.createApp()

dictionaryRouter.use(sessionMiddleware())

dictionaryRouter.get(
  '/',
  async (c) => {
    const data = await getDictionary()

    return c.json(wrapSuccess(data))
  },
)

export { dictionaryRouter }
