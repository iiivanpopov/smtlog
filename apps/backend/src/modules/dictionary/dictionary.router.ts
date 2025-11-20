import { config } from '@/config'
import { factory, withCache, wrapSuccess } from '@/lib'
import { sessionMiddleware } from '@/middleware'
import { getDictionary } from './dictionary.service'

const dictionaryRouter = factory.createApp()

dictionaryRouter.use(sessionMiddleware())

dictionaryRouter.get(
  '/',
  async (c) => {
    const dictionary = await withCache(config.cache.dictionary, getDictionary, 5 * 60)

    return c.json(wrapSuccess(dictionary))
  },
)

export { dictionaryRouter }
