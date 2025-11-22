import type { CreateSMTLineData, GetSMTLinesData } from './schemas'
import { count, eq } from 'drizzle-orm'
import { db, smtLinesTable } from '@/database'

export async function getSMTLines(userId: number, payload: GetSMTLinesData) {
  const smtLines = db.select()
    .from(smtLinesTable)
    .offset(payload.page * payload.limit)
    .limit(payload.limit)
    .where(eq(smtLinesTable.userId, userId))
    .all()

  const smtLinesCount = db.select({ count: count() })
    .from(smtLinesTable)
    .where(eq(smtLinesTable.userId, userId))
    .get()

  return {
    smtLines,
    meta: {
      total: smtLinesCount?.count,
    },
  }
}

export async function createSMTLine(userId: number, { timeEnd, timeStart, comment, ...payload }: CreateSMTLineData) {
  await db.insert(smtLinesTable).values({
    userId,
    ...payload,
    comment: comment || undefined,
    timeEnd: new Date(timeEnd * 1000),
    timeStart: new Date(timeStart * 1000),
  })
}

export async function deleteSMTLine(id: number) {
  await db.delete(smtLinesTable).where(eq(smtLinesTable.id, id))
}
