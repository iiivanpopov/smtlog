import type { User } from '@/database'
import { ApiException, factory } from '@/lib'

export function roleMiddleware(allowedRoles: (User['role'])[]) {
  return factory.createMiddleware(async (c, next) => {
    const user = c.get('user')

    if (!allowedRoles.includes(user.role))
      throw ApiException.Forbidden()

    await next()
  })
}
