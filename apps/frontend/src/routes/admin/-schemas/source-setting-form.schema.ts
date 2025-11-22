import { z } from 'zod'

export const SourceSettingFormSchema = z.object({
  source: z.string().min(1),
})

export type SourceSettingFormData = z.infer<typeof SourceSettingFormSchema>

export const sourceSettingFormDefaultValues: SourceSettingFormData = {
  source: '',
}
