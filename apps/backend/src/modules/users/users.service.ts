import type { GetUsersData } from './schemas'
import { and, count, desc, eq, like } from 'drizzle-orm'
import { db, toUserDTO, usersTable } from '@/database'

export function getUsers(payload: GetUsersData) {
  const users = db.select()
    .from(usersTable)
    .offset((payload.page - 1) * payload.limit)
    .limit(payload.limit)
    .where(
      and(
        payload.search ? like(usersTable.name, `%${payload.search}%`) : undefined,
        eq(usersTable.role, 'user'),
      ),
    )
    .orderBy(desc(usersTable.createdAt))
    .all()

  const usersCount = db.select({ count: count() })
    .from(usersTable)
    .get()

  return {
    meta: { total: usersCount?.count },
    users: users.map(toUserDTO),
  }
}

export function deleteUser(id: number) {
  db.delete(usersTable).where(eq(usersTable.id, id)).run()
}
