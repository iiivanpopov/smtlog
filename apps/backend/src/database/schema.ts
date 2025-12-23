import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  role: text({ enum: ['admin', 'user'] }).notNull().default('user'),
  name: text().notNull().unique(),
  code: text().notNull().unique(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type User = InferSelectModel<typeof usersTable>
export type UserRole = User['role']
export type UserDTO = Omit<User, 'code'>
export type NewUser = InferInsertModel<typeof usersTable>

export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    createdAt: user.createdAt,
    name: user.name,
    role: user.role,
  }
}

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

export const settingsTable = sqliteTable('settings', {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull().unique(),
  value: text().notNull(),
})

export type Setting = InferSelectModel<typeof settingsTable>
export type SettingDTO = Setting
export type NewSetting = InferInsertModel<typeof settingsTable>

export const smtLinesTable = sqliteTable('smt_lines', {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int('user_id')
    .references(() => usersTable.id, { onDelete: 'set null' }),
  board: text().notNull(),
  comment: text(),
  timeStart: int('time_start', { mode: 'timestamp' }).notNull(),
  timeEnd: int('time_end', { mode: 'timestamp' }).notNull(),
  firstMPcb: int('first_m_pcb').notNull(),
  firstPcb: int('first_pcb').notNull(),
  lastMPcb: int('last_m_pcb').notNull(),
  lastPcb: int('last_pcb').notNull(),
  pcbSide: text('pcb_side', { enum: ['T', 'B'] })
    .notNull()
    .default('T'),
  donePerShiftMPcb: int('done_per_shift_m_pcb').notNull(),
  donePerShiftPcb: int('done_per_shift_pcb').notNull(),
  segmentsCount: int('segments_count').notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type SMTLine = InferSelectModel<typeof smtLinesTable>
export type SMTLineDTO = SMTLine
export type NewSMTLine = InferInsertModel<typeof smtLinesTable>
