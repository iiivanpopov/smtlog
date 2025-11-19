import { zValidator } from '@hono/zod-validator'
import { factory } from '@/lib'
import { roleMiddleware, sessionMiddleware } from '@/middleware'
import { wrapSuccess } from '@/shared'
import { DeleteUserSchema, GetUsersSchema } from './schemas'
import { deleteUser, getUsers } from './users.service'

const usersRouter = factory.createApp()

usersRouter.use(sessionMiddleware(), roleMiddleware(['admin']))

usersRouter.get(
  '/',
  zValidator('query', GetUsersSchema),
  async (c) => {
    const query = c.req.valid('query')

    const users = await getUsers(query)

    return c.json(wrapSuccess({ users }))
  },
)

usersRouter.delete(
  '/:id',
  zValidator('param', DeleteUserSchema),
  async (c) => {
    const { id } = c.req.valid('param')

    await deleteUser(id)

    return c.json(wrapSuccess())
  },
)

export { usersRouter }
