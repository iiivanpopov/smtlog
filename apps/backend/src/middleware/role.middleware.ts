import type { UserRole } from '@/database'
import { ApiException, factory } from '@/lib'

export function roleMiddleware(allowedRoles: UserRole[]) {
  return factory.createMiddleware(async (c, next) => {
    const user = c.get('user')

    if (!allowedRoles.includes(user.role))
      throw ApiException.Forbidden()

    await next()
  })
}
