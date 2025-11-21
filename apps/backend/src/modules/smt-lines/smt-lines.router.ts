import { zValidator } from '@hono/zod-validator'
import { factory, wrapSuccess } from '@/lib'
import { sessionMiddleware } from '@/middleware'
import { CreateSMTLineSchema, DeleteSMTLineSchema, GetSMTLinesSchema } from './schemas'
import { createSMTLine, deleteSMTLine, getSMTLines } from './smt-lines.service'

const smtLinesRouter = factory.createApp()

smtLinesRouter.use(sessionMiddleware())

smtLinesRouter.get(
  '/me',
  zValidator('query', GetSMTLinesSchema),
  async (c) => {
    const user = c.get('user')
    const query = c.req.valid('query')

    const data = await getSMTLines(user.id, query)

    return c.json(wrapSuccess(data), 200)
  },
)

smtLinesRouter.post(
  '/',
  zValidator('json', CreateSMTLineSchema),
  async (c) => {
    const user = c.get('user')
    const body = c.req.valid('json')

    await createSMTLine(user.id, body)

    return c.json(wrapSuccess(), 201)
  },
)

smtLinesRouter.delete(
  '/:id',
  zValidator('param', DeleteSMTLineSchema),
  async (c) => {
    const { id } = c.req.valid('param')

    await deleteSMTLine(id)

    return c.json(wrapSuccess(), 200)
  },
)

export { smtLinesRouter }
