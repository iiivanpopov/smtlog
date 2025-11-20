import { z } from 'zod'

export const RouteQuerySchema = z.object({
  page: z.number().default(0),
})
