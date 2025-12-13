import { config } from '@/config'
import { factory, withCache, wrapSuccess } from '@/lib'
import { sessionMiddleware } from '@/middleware'
import { getDictionary } from './dictionary.service'

const dictionaryRouter = factory.createApp()

dictionaryRouter.use(sessionMiddleware())

dictionaryRouter.get('/', async (c) => {
  const dictionary = await withCache(
    config.cache.dictionary,
    getDictionary,
    config.cache.dictionaryTTL,
  )

  c.header(
    'Cache-Control',
    `public, max-age=${config.cache.dictionaryTTL}`,
  )

  return c.json(wrapSuccess(dictionary), 200)
})

export { dictionaryRouter }
