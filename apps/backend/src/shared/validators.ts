import { z } from 'zod'

export const nameValidator = z
  .string('validation.string')
  .min(2, 'validation.min')
  .max(64, 'validation.max')
  .transform(v => v.trim().replace(/\s+/g, ' '))

export const codeValidator = z
  .string('validation.string')
  .min(6, 'validation.min')
  .max(12, 'validation.max')
  .regex(/^\d+$/, 'validation.digits')
