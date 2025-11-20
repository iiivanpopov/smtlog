import { eq } from 'drizzle-orm'
import { parse as parseCSV } from 'papaparse'
import { config } from '@/config'
import { db, settingsTable } from '@/database'
import { ApiException } from '@/lib'

export async function getDictionary(): Promise<Record<string, string[]>> {
  const externalDictionary = db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.key, config.settings.externalDictionary))
    .get()

  if (!externalDictionary?.value)
    throw ApiException.BadRequest()

  const csv = await fetch(externalDictionary.value).then((res) => {
    if (!res.ok)
      throw ApiException.InternalServerError()
    return res.text()
  })

  const { data, errors } = parseCSV(csv.trim(), {
    skipEmptyLines: true,
  })

  if (errors.length > 0)
    throw ApiException.InternalServerError()

  if (data.length < 1)
    return {}

  const [headers, ...rows] = data as string[][]

  const dictionary: Record<string, string[]> = {}

  for (let i = 0; i < headers!.length; i++) {
    const column = headers![i]
    if (!column)
      continue

    dictionary[column] = []

    for (const row of rows) {
      const value = row[i]
      if (value != null && value !== '')
        dictionary[column].push(value)
    }
  }

  return dictionary
}
