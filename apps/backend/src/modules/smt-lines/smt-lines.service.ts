import type { CreateSMTLineData, GetSMTLinesData } from './schemas'
import { and, count, desc, eq, gt } from 'drizzle-orm'
import { db, smtLinesTable } from '@/database'

export async function getSMTLines(userId: number, payload: GetSMTLinesData) {
  const smtLines = db.select()
    .from(smtLinesTable)
    .offset((payload.page - 1) * payload.limit)
    .limit(payload.limit)
    .where(
      and(
        eq(smtLinesTable.userId, userId),
        gt(smtLinesTable.createdAt, new Date(Math.floor(Date.now() / 1000) - 86400)),
      ),
    )
    .orderBy(desc(smtLinesTable.createdAt))
    .all()

  const smtLinesCount = db.select({ count: count() })
    .from(smtLinesTable)
    .where(eq(smtLinesTable.userId, userId))
    .get()

  return {
    smtLines,
    meta: { total: smtLinesCount?.count },
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
