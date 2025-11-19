import { z } from 'zod'
import { settingsKeyValidator } from '@/shared'

export const GetSettingSchema = z.object({
  key: settingsKeyValidator,
})

export type GetSettingData = z.infer<typeof GetSettingSchema>
