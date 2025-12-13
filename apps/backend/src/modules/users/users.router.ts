import { zValidator } from '@hono/zod-validator'
import { factory, wrapSuccess } from '@/lib'
import { roleMiddleware, sessionMiddleware } from '@/middleware'
import { DeleteUserSchema, GetUsersSchema } from './schemas'
import { deleteUser, getUsers } from './users.service'

const usersRouter = factory.createApp()

usersRouter.use(sessionMiddleware(), roleMiddleware(['admin']))

usersRouter.get(
  '/',
  zValidator('query', GetUsersSchema),
  (c) => {
    const query = c.req.valid('query')

    const data = getUsers(query)

    return c.json(wrapSuccess(data), 200)
  },
)

usersRouter.delete(
  '/:id',
  zValidator('param', DeleteUserSchema),
  (c) => {
    const { id } = c.req.valid('param')

    deleteUser(id)

    return c.json(wrapSuccess(), 200)
  },
)

export { usersRouter }
