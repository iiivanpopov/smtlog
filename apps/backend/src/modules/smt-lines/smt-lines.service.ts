import type { CreateSMTLineData, GetSMTLinesData } from './schemas'
import { eq } from 'drizzle-orm'
import { db, smtLinesTable } from '@/database'

export async function getSMTLines(payload: GetSMTLinesData) {
  return db.select()
    .from(smtLinesTable)
    .offset(payload.page * payload.limit)
    .limit(payload.limit)
    .all()
}

export async function createSMTLine({ timeEnd, timeStart, ...payload }: CreateSMTLineData) {
  await db.insert(smtLinesTable).values({
    ...payload,
    timeEnd: new Date(timeEnd * 1000),
    timeStart: new Date(timeStart * 1000),
  })
}

export async function deleteSMTLine(id: number) {
  await db.delete(smtLinesTable).where(eq(smtLinesTable.id, id))
}
