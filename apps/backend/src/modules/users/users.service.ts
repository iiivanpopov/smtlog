import type { GetUsersData } from './schemas'
import { eq, like } from 'drizzle-orm'
import { db, toUserDTO, usersTable } from '@/database'

export async function getUsers(payload: GetUsersData) {
  const users = db.select()
    .from(usersTable)
    .offset(payload.page * payload.limit)
    .limit(payload.limit)
    .where(
      payload.search
        ? like(usersTable.name, `%${payload.search}%`)
        : undefined,
    )
    .all()

  return users.map(toUserDTO)
}

export async function deleteUser(id: number) {
  await db.delete(usersTable).where(eq(usersTable.id, id))
}
