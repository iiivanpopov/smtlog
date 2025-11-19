import { z } from 'zod'
import { settingsKeyValidator, settingsValueValidator } from '@/shared'

export const SetSettingSchema = z.object({
  key: settingsKeyValidator,
  value: settingsValueValidator,
})

export type SetSettingData = z.infer<typeof SetSettingSchema>
