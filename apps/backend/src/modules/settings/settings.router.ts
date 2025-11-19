import { zValidator } from '@hono/zod-validator'
import { factory } from '@/lib'
import { roleMiddleware, sessionMiddleware } from '@/middleware'
import { wrapSuccess } from '@/shared'
import { GetSettingSchema, SetSettingSchema } from './schemas'
import { getSetting, setSetting } from './settings.service'

const settingsRouter = factory.createApp()

settingsRouter.use(sessionMiddleware(), roleMiddleware(['admin']))

settingsRouter.put(
  '/',
  zValidator('json', SetSettingSchema),
  async (c) => {
    const body = c.req.valid('json')

    await setSetting(body)

    return c.json(wrapSuccess(), 200)
  },
)

settingsRouter.get(
  '/:key',
  zValidator('param', GetSettingSchema),
  async (c) => {
    const { key } = c.req.valid('param')

    const setting = await getSetting(key)

    return c.json(wrapSuccess({ setting }), 200)
  },
)

export { settingsRouter }
