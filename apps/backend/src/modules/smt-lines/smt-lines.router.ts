import { zValidator } from '@hono/zod-validator'
import { factory, wrapSuccess } from '@/lib'
import { sessionMiddleware } from '@/middleware'
import { CreateSMTLineSchema, DeleteSMTLineSchema, GetSMTLinesSchema } from './schemas'
import { createSMTLine, deleteSMTLine, getSMTLines } from './smt-lines.service'

const smtLinesRouter = factory.createApp()

smtLinesRouter.use(sessionMiddleware())

smtLinesRouter.get(
  '/',
  zValidator('query', GetSMTLinesSchema),
  async (c) => {
    const query = c.req.valid('query')

    const smtLines = await getSMTLines(query)

    return c.json(wrapSuccess({ smtLines }), 200)
  },
)

smtLinesRouter.post(
  '/',
  zValidator('json', CreateSMTLineSchema),
  async (c) => {
    const body = c.req.valid('json')

    await createSMTLine(body)

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
