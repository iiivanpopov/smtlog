import type { NewSetting } from '@/database'
import { eq } from 'drizzle-orm'
import { db, settingsTable } from '@/database'
import { ApiException } from '@/lib'

export function setSetting(payload: Omit<NewSetting, 'id'>) {
  db.insert(settingsTable)
    .values(payload)
    .onConflictDoUpdate({
      set: { value: payload.value },
      target: settingsTable.key,
    })
    .run()
}

export function getSetting(key: string) {
  const setting = db.select()
    .from(settingsTable)
    .where(eq(settingsTable.key, key))
    .get()
  if (!setting)
    throw ApiException.NotFound()

  return setting
}
