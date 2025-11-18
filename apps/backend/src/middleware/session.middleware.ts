import { eq } from 'drizzle-orm'
import { db, sessionsTable, usersTable } from '@/database'
import { ApiException, factory } from '@/lib'

export function sessionMiddleware() {
  return factory.createMiddleware(async (c, next) => {
    const auth = c.req.header('Authorization')
    if (!auth)
      throw ApiException.Unauthorized()

    const token = auth.slice(7)

    const session = db.select()
      .from(sessionsTable)
      .innerJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
      .where(eq(sessionsTable.token, token))
      .get()
    if (!session)
      throw ApiException.Unauthorized()

    c.set('user', session.users)

    await next()
  })
}
