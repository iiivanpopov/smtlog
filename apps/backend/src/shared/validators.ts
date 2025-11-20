import { z } from 'zod'

export const userNameValidator = z
  .string('validation.string')
  .min(2, 'validation.min')
  .max(64, 'validation.max')
  .transform(v => v.trim().replace(/\s+/g, ' '))

export const userCodeValidator = z
  .string('validation.string')
  .min(6, 'validation.min')
  .max(12, 'validation.max')
  .regex(/^\d+$/, 'validation.digits')

export const settingsKeyValidator = z
  .string('validation.string')
  .min(1, 'validation.min')
export const settingsValueValidator = z
  .string('validation.string')
  .min(1, 'validation.min')

export const stringToNumberValidator = z
  .string('validation.string')
  .regex(/^\d+$/, 'validation.digits')
  .transform(v => Number(v))
