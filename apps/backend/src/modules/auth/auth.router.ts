import { zValidator } from '@hono/zod-validator'
import { toUserDTO } from '@/database'
import { factory, wrapSuccess } from '@/lib'
import { roleMiddleware, sessionMiddleware } from '@/middleware'
import { login, logout, register } from './auth.service'
import { LoginSchema, RegisterSchema } from './schemas'

const authRouter = factory.createApp()

authRouter.get(
  '/session',
  sessionMiddleware(),
  async (c) => {
    const user = c.get('user')

    return c.json(wrapSuccess({ user: toUserDTO(user) }), 200)
  },
)

authRouter.post(
  '/login',
  zValidator('json', LoginSchema),
  async (c) => {
    const body = c.req.valid('json')

    const token = await login(body.code)

    return c.json(wrapSuccess({ token }), 200)
  },
)

authRouter.post(
  '/register',
  sessionMiddleware(),
  roleMiddleware(['admin']),
  zValidator('json', RegisterSchema),
  async (c) => {
    const body = c.req.valid('json')

    await register(body)

    return c.json(wrapSuccess(), 201)
  },
)

authRouter.post(
  '/logout',
  sessionMiddleware(),
  async (c) => {
    const user = c.get('user')

    await logout(user.id)

    return c.json(wrapSuccess(), 200)
  },
)

export { authRouter }
