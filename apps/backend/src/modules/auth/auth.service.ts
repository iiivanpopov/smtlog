import type { NewUser } from '@/database'
import { eq, or } from 'drizzle-orm'
import { db, sessionsTable, usersTable } from '@/database'
import { ApiException } from '@/lib'

export function login(code: string) {
  const user = db.select()
    .from(usersTable)
    .where(eq(usersTable.code, code))
    .get()
  if (!user)
    throw ApiException.Unauthorized('Invalid code')

  const token = crypto.randomUUID()

  db.insert(sessionsTable)
    .values({ token, userId: user.id })
    .onConflictDoUpdate({
      target: sessionsTable.userId,
      set: { token },
    })
    .run()

  return token
}

export function register(payload: Pick<NewUser, 'name' | 'code'>) {
  const user = db.select()
    .from(usersTable)
    .where(or(
      eq(usersTable.name, payload.name),
      eq(usersTable.code, payload.code),
    ))
    .get()
  if (user)
    throw ApiException.BadRequest()

  db.insert(usersTable).values(payload).run()
}

export function logout(userId: number) {
  db.delete(sessionsTable).where(eq(sessionsTable.userId, userId)).run()
}
