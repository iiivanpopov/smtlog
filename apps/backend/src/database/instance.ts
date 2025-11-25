import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { config } from '@/config'
import { logger } from '@/lib'
import * as schema from './schema'

const sqlite = new Database(config.database.url)
export const db = drizzle(sqlite, { schema })

if (config.env.production) {
  migrate(db, { migrationsFolder: './drizzle' })
  logger.info('Applied migrations.')

  db.insert(schema.usersTable).values({
    id: 0,
    code: config.secrets.adminCode,
    name: 'Admin',
    role: 'admin',
  }).onConflictDoUpdate({
    target: schema.usersTable.id,
    set: { code: config.secrets.adminCode },
  }).then(() => logger.info('Seeded admin.'))
}
