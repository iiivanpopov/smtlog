import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  role: text({ enum: ['admin', 'user'] as const }).notNull().default('user'),
  name: text().notNull(),
  code: text().notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type User = InferSelectModel<typeof usersTable>
export type NewUser = InferInsertModel<typeof usersTable>

export const sessionsTable = sqliteTable('sessions', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id')
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  token: text().notNull().unique(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type Session = InferSelectModel<typeof sessionsTable>
export type NewSession = InferInsertModel<typeof sessionsTable>
