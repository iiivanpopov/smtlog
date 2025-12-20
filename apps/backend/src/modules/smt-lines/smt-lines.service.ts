import type { CreateSMTLineData, GetSMTLinesData } from './schemas'
import { and, count, desc, eq, gt } from 'drizzle-orm'
import { db, smtLinesTable } from '@/database'

export function getSMTLines(userId: number, payload: GetSMTLinesData) {
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

export function createSMTLine(userId: number, { timeEnd, timeStart, comment, ...payload }: CreateSMTLineData) {
  db.insert(smtLinesTable).values({
    userId,
    board: payload.board,
    count: payload.count,
    comment: comment || undefined,
    lastMPcb: payload.lastMPcb,
    lastPcb: payload.lastPcb,
    firstMPcb: payload.firstMPcb,
    firstPcb: payload.firstPcb,
    pcbSide: payload.pcbSide,
    segmentsCount: payload.segmentsCount,
    donePerShiftMPcb: payload.lastMPcb - payload.firstMPcb + 1,
    donePerShiftPcb: payload.lastPcb - payload.firstPcb + payload.segmentsCount,
    timeEnd: new Date(timeEnd * 1000),
    timeStart: new Date(timeStart * 1000),
  }).run()
}

export function deleteSMTLine(id: number) {
  db.delete(smtLinesTable).where(eq(smtLinesTable.id, id)).run()
}
