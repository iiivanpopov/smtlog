import { z } from 'zod'

export const stringToNumberValidator = z
  .string()
  .regex(/^\d+$/)
  .transform(v => Number(v))

export const userNameValidator = z
  .string()
  .min(2)
  .max(64)
  .transform(v => v.trim().replace(/\s+/g, ' '))

export const userCodeValidator = z
  .string()
  .min(6)
  .max(12)
  .regex(/^\d+$/)

export const settingsKeyValidator = z
  .string()
  .min(1)
export const settingsValueValidator = z
  .string()
  .min(1)

export const paginationPageValidator = stringToNumberValidator
  .default(1)
export const paginationLimitValidator = stringToNumberValidator
  .default(10)

export const smtLineBoardValidator = z
  .string()
  .min(1)
export const smtLineCountValidator = z
  .number()
  .min(1)
export const smtLineCommentValidator = z
  .string()
  .optional()
export const smtLineTimeStartValidator = z
  .number()
export const smtLineTimeEndValidator = z
  .number()
export const smtLineFirstMPcbValidator = z
  .number()
  .int()
  .min(1)
export const smtLineFirstPcbValidator = z
  .number()
  .int()
  .min(1)
export const smtLineLastMPcbValidator = z
  .number()
  .int()
  .min(1)
export const smtLineLastPcbValidator = z
  .number()
  .int()
  .min(1)
export const smtLinePcbSideValidator = z
  .enum(['T', 'B'])
export const smtLineSegmentsCountValidator = z
  .number()
  .int()
  .min(1)
