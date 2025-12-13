import { zValidator } from '@hono/zod-validator'
import { factory, wrapSuccess } from '@/lib'
import { roleMiddleware, sessionMiddleware } from '@/middleware'
import { GetSettingSchema, SetSettingSchema } from './schemas'
import { getSetting, setSetting } from './settings.service'

const settingsRouter = factory.createApp()

settingsRouter.use(sessionMiddleware(), roleMiddleware(['admin']))

settingsRouter.put(
  '/',
  zValidator('json', SetSettingSchema),
  (c) => {
    const body = c.req.valid('json')

    setSetting(body)

    return c.json(wrapSuccess(), 200)
  },
)

settingsRouter.get(
  '/:key',
  zValidator('param', GetSettingSchema),
  (c) => {
    const { key } = c.req.valid('param')

    const setting = getSetting(key)

    return c.json(wrapSuccess({ setting }), 200)
  },
)

export { settingsRouter }
