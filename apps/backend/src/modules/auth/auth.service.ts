import type { NewUser } from '@/database'
import { eq, or } from 'drizzle-orm'
import { db, sessionsTable, usersTable } from '@/database'
import { ApiException } from '@/lib'

export async function login(code: string) {
  const user = db.select()
    .from(usersTable)
    .where(eq(usersTable.code, code))
    .get()
  if (!user)
    throw ApiException.NotFound()

  const token = crypto.randomUUID()

  await db.insert(sessionsTable)
    .values({ token, userId: user.id })
    .onConflictDoUpdate({
      target: sessionsTable.userId,
      set: { token },
    })

  return token
}

export async function register(payload: Pick<NewUser, 'name' | 'code'>) {
  const user = db.select()
    .from(usersTable)
    .where(or(
      eq(usersTable.name, payload.name),
      eq(usersTable.code, payload.code),
    ))
    .get()
  if (user)
    throw ApiException.BadRequest()

  await db.insert(usersTable).values(payload)
}

export async function logout(userId: number) {
  await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId))
}
