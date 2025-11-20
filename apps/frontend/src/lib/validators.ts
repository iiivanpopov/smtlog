import { z } from 'zod'

export const userCodeMin = 6
export const userCodeMax = 12

export const userCodeValidator = z
  .string()
  .min(userCodeMin, 'validation.user-code.min')
  .max(userCodeMax, 'validation.user-code.max')
  .regex(/^\d+$/, 'validation.digits')
